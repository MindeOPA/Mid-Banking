local fw = {}

if Config.Framework == 'esx' then
    local ESX = exports['es_extended']:getSharedObject()

    local function wrapESX(xPlayer)
        if not xPlayer then return nil end
        return {
            source = xPlayer.source,
            identifier = xPlayer.identifier,
            getMoney = function() return xPlayer.getMoney() end,
            getBankMoney = function() return xPlayer.getAccount('bank').money end,
            addMoney = function(a) xPlayer.addMoney(a) end,
            removeMoney = function(a) xPlayer.removeMoney(a) end,
            addBankMoney = function(a) xPlayer.addAccountMoney('bank', a) end,
            removeBankMoney = function(a) xPlayer.removeAccountMoney('bank', a) end,
            getName = function() return xPlayer.getName() end
        }
    end

    fw.registerCallback = function(name, cb) ESX.RegisterServerCallback(name, cb) end
    fw.getPlayer = function(src) return wrapESX(ESX.GetPlayerFromId(src)) end
    fw.getPlayerByIdentifier = function(id) return wrapESX(ESX.GetPlayerFromIdentifier(id)) end

    fw.getAllPlayers = function()
        local result = {}
        for _, xPlayer in pairs(ESX.GetExtendedPlayers()) do
            result[#result + 1] = wrapESX(xPlayer)
        end
        return result
    end

    fw.addBankMoneyOffline = function(identifier, amount)
        local str = MySQL.scalar.await('SELECT accounts FROM users WHERE identifier = ?', {identifier})
        if not str then return false end
        local accs = json.decode(str)
        for i, a in ipairs(accs) do
            if a.name == 'bank' then
                accs[i].money = accs[i].money + amount
                MySQL.update.await('UPDATE users SET accounts = ? WHERE identifier = ?', {json.encode(accs), identifier})
                return true
            end
        end
        return false
    end

    fw.getBankMoneyOffline = function(identifier)
        local str = MySQL.scalar.await('SELECT accounts FROM users WHERE identifier = ?', {identifier})
        if not str then return 0 end
        for _, a in ipairs(json.decode(str)) do
            if a.name == 'bank' then return a.money end
        end
        return 0
    end

    fw.searchPlayers = function(q, exclude)
        return MySQL.query.await(
            "SELECT a.account_number, u.firstname, u.lastname FROM mid_bank_accounts a LEFT JOIN users u ON u.identifier = a.identifier WHERE (a.account_number LIKE ? OR u.firstname LIKE ? OR u.lastname LIKE ?) AND a.identifier != ? LIMIT 8",
            {'%' .. q .. '%', '%' .. q .. '%', '%' .. q .. '%', exclude}
        )
    end

    fw.getMemberInfo = function(sharedId)
        return MySQL.query.await(
            'SELECT m.id, m.identifier, m.role, m.added_at, u.firstname, u.lastname FROM mid_bank_shared_members m LEFT JOIN users u ON u.identifier = m.identifier WHERE m.shared_account_id = ?',
            {sharedId}
        )
    end

elseif Config.Framework == 'qb' then
    local QBCore = exports['qb-core']:GetCoreObject()

    local function wrapQB(qPlayer)
        if not qPlayer then return nil end
        return {
            source = qPlayer.PlayerData.source,
            identifier = qPlayer.PlayerData.citizenid,
            getMoney = function() return qPlayer.Functions.GetMoney('cash') end,
            getBankMoney = function() return qPlayer.Functions.GetMoney('bank') end,
            addMoney = function(a) qPlayer.Functions.AddMoney('cash', a, 'mid-banking') end,
            removeMoney = function(a) qPlayer.Functions.RemoveMoney('cash', a, 'mid-banking') end,
            addBankMoney = function(a) qPlayer.Functions.AddMoney('bank', a, 'mid-banking') end,
            removeBankMoney = function(a) qPlayer.Functions.RemoveMoney('bank', a, 'mid-banking') end,
            getName = function()
                local ci = qPlayer.PlayerData.charinfo
                return (ci.firstname or '') .. ' ' .. (ci.lastname or '')
            end
        }
    end

    fw.registerCallback = function(name, cb) QBCore.Functions.CreateCallback(name, cb) end
    fw.getPlayer = function(src) return wrapQB(QBCore.Functions.GetPlayer(src)) end

    fw.getPlayerByIdentifier = function(citizenid)
        return wrapQB(QBCore.Functions.GetPlayerByCitizenId(citizenid))
    end

    fw.getAllPlayers = function()
        local result = {}
        for _, qPlayer in pairs(QBCore.Functions.GetQBPlayers()) do
            result[#result + 1] = wrapQB(qPlayer)
        end
        return result
    end

    fw.addBankMoneyOffline = function(citizenid, amount)
        local str = MySQL.scalar.await('SELECT money FROM players WHERE citizenid = ?', {citizenid})
        if not str then return false end
        local money = json.decode(str)
        money.bank = (money.bank or 0) + amount
        MySQL.update.await('UPDATE players SET money = ? WHERE citizenid = ?', {json.encode(money), citizenid})
        return true
    end

    fw.getBankMoneyOffline = function(citizenid)
        local str = MySQL.scalar.await('SELECT money FROM players WHERE citizenid = ?', {citizenid})
        if not str then return 0 end
        return json.decode(str).bank or 0
    end

    fw.searchPlayers = function(q, exclude)
        return MySQL.query.await(
            "SELECT a.account_number, JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')) as firstname, JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname')) as lastname FROM mid_bank_accounts a LEFT JOIN players p ON p.citizenid = a.identifier WHERE (a.account_number LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')) LIKE ? OR JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname')) LIKE ?) AND a.identifier != ? LIMIT 8",
            {'%' .. q .. '%', '%' .. q .. '%', '%' .. q .. '%', exclude}
        )
    end

    fw.getMemberInfo = function(sharedId)
        return MySQL.query.await(
            "SELECT m.id, m.identifier, m.role, m.added_at, JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')) as firstname, JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname')) as lastname FROM mid_bank_shared_members m LEFT JOIN players p ON p.citizenid = m.identifier WHERE m.shared_account_id = ?",
            {sharedId}
        )
    end
end

local failedAttempts = {}

local function getIdentifier(src)
    local player = fw.getPlayer(src)
    if not player then return nil end
    return player.identifier
end

local function generateAccountNumber()
    local num = 'MID'
    for _ = 1, 8 do
        num = num .. math.random(0, 9)
    end
    local exists = MySQL.scalar.await('SELECT account_number FROM mid_bank_accounts WHERE account_number = ?', {num})
    if exists then return generateAccountNumber() end
    return num
end

local function generateSharedNumber()
    local num = 'SHA'
    for _ = 1, 8 do
        num = num .. math.random(0, 9)
    end
    local exists = MySQL.scalar.await('SELECT account_number FROM mid_bank_shared WHERE account_number = ?', {num})
    if exists then return generateSharedNumber() end
    return num
end

local function hashPin(pin, salt)
    return GetHashKey(tostring(pin) .. '::' .. tostring(salt))
end

-- number formatter for logs/messages
local function formatNum(n)
    local s = tostring(math.floor(n))
    local pos = #s % 3
    if pos == 0 then pos = 3 end
    return s:sub(1, pos) .. s:sub(pos + 1):gsub('(%d%d%d)', ',%1')
end

local function addTransaction(accNum, txType, amount, balAfter, desc, ref)
    MySQL.insert('INSERT INTO mid_bank_transactions (account_number, type, amount, balance_after, description, reference) VALUES (?, ?, ?, ?, ?, ?)', {
        accNum, txType, amount, balAfter, desc or '', ref or ''
    })
end

local function addLog(identifier, action, details)
    MySQL.insert('INSERT INTO mid_bank_logs (identifier, action, details) VALUES (?, ?, ?)',
        {identifier, action, details})

    if Config.EnableWebhookLogs and Config.WebhookURL ~= '' then
        PerformHttpRequest(Config.WebhookURL, function() end, 'POST', json.encode({
            embeds = {{
                title = 'Mid Banking | ' .. action,
                description = details,
                color = Config.WebhookColor,
                footer = {text = identifier},
                timestamp = os.date('!%Y-%m-%dT%H:%M:%SZ')
            }}
        }), {['Content-Type'] = 'application/json'})
    end
end

local function getAccountLevel(totalVolume)
    if totalVolume >= 10000000 then return 'Diamond', '#b9f2ff'
    elseif totalVolume >= 5000000 then return 'Platinum', '#e5e4e2'
    elseif totalVolume >= 1000000 then return 'Gold', '#ffd700'
    elseif totalVolume >= 250000 then return 'Silver', '#c0c0c0'
    else return 'Bronze', '#cd7f32' end
end

fw.registerCallback('mid-banking:getAccount', function(src, cb)
    local identifier = getIdentifier(src)
    if not identifier then return cb(nil) end

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb(nil) end

    local player = fw.getPlayer(src)
    if not player then return cb(nil) end

-- auto unfreeze check
    if account.is_frozen == 1 and account.frozen_until then
        if os.time() > account.frozen_until then
            MySQL.update('UPDATE mid_bank_accounts SET is_frozen = 0, frozen_until = NULL WHERE id = ?', {account.id})
            account.is_frozen = 0
        end
    end

    local totalVolume = tonumber(MySQL.scalar.await(
        'SELECT COALESCE(SUM(amount), 0) FROM mid_bank_transactions WHERE account_number = ?',
        {account.account_number}
    )) or 0

    local level, levelColor = getAccountLevel(totalVolume)

    cb({
        account_number = account.account_number,
        balance = player.getBankMoney(),
        cash = player.getMoney(),
        savings = account.savings or 0,
        is_frozen = account.is_frozen == 1,
        level = level,
        level_color = levelColor,
        created_at = account.created_at
    })
end)

fw.registerCallback('mid-banking:verifyPin', function(src, cb, pin)
    local identifier = getIdentifier(src)
    if not identifier then return cb(false, 'Error') end

    local key = identifier
    if failedAttempts[key] and failedAttempts[key].frozen then
        if os.time() < failedAttempts[key].until_time then
            local mins = math.ceil((failedAttempts[key].until_time - os.time()) / 60)
            return cb(false, 'Account locked. Try again in ' .. mins .. ' min.')
        end
        failedAttempts[key] = nil
    end

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb(false, 'Account not found') end

    local hashed = hashPin(pin, account.account_number)
    if account.pin ~= hashed then
        if not failedAttempts[key] then failedAttempts[key] = {count = 0} end
        failedAttempts[key].count = failedAttempts[key].count + 1

        if Config.MaxPinAttempts > 0 and failedAttempts[key].count >= Config.MaxPinAttempts then
            failedAttempts[key].frozen = true
            failedAttempts[key].until_time = os.time() + (Config.FreezeDuration * 60)
            addLog(identifier, 'PIN_LOCKED', 'Account locked after ' .. Config.MaxPinAttempts .. ' failed attempts')
            return cb(false, 'Too many attempts. Locked for ' .. Config.FreezeDuration .. ' min.')
        end

        local remaining = Config.MaxPinAttempts - failedAttempts[key].count
        addLog(identifier, 'PIN_FAILED', 'Failed PIN attempt (' .. remaining .. ' remaining)')
        return cb(false, remaining .. ' attempts remaining')
    end

    failedAttempts[key] = nil
    addLog(identifier, 'LOGIN', 'Successful authentication')
    cb(true)
end)

fw.registerCallback('mid-banking:register', function(src, cb, pin)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local existing = MySQL.single.await('SELECT id FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if existing then return cb({success = false, message = 'Account already exists'}) end

    if not pin or #tostring(pin) ~= Config.PinLength then
        return cb({success = false, message = 'Invalid PIN'})
    end

    local accountNumber = generateAccountNumber()
    local hashed = hashPin(tostring(pin), accountNumber)

    MySQL.insert.await(
        'INSERT INTO mid_bank_accounts (identifier, account_number, pin, savings) VALUES (?, ?, ?, 0)',
        {identifier, accountNumber, hashed}
    )

    local player = fw.getPlayer(src)

    if Config.StartingBalance > 0 then
        player.addBankMoney(Config.StartingBalance)
    end

    addLog(identifier, 'REGISTER', 'Account created: ' .. accountNumber)
    addTransaction(accountNumber, 'account_created', 0, player.getBankMoney(), 'Account opened', nil)

    local level, levelColor = getAccountLevel(0)

    cb({
        success = true,
        account = {
            account_number = accountNumber,
            balance = player.getBankMoney(),
            cash = player.getMoney(),
            savings = 0,
            is_frozen = false,
            level = level,
            level_color = levelColor,
            created_at = os.date('%Y-%m-%d %H:%M:%S')
        }
    })
end)

fw.registerCallback('mid-banking:deposit', function(src, cb, amount, sourceType)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    amount = tonumber(amount)
    if not amount or amount < Config.MinDeposit then
        return cb({success = false, message = 'Invalid amount'})
    end
    amount = math.floor(amount)

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    if account.is_frozen == 1 then
        return cb({success = false, message = 'Account is frozen'})
    end

    local limit = sourceType == 'atm' and Config.ATMDepositLimit or Config.BankDepositLimit
    if limit > 0 and amount > limit then
        return cb({success = false, message = 'Deposit limit: $' .. formatNum(limit)})
    end

    if player.getMoney() < amount then
        return cb({success = false, message = 'Not enough cash'})
    end

    player.removeMoney(amount)
    player.addBankMoney(amount)

    local newBalance = player.getBankMoney()
    addTransaction(account.account_number, 'deposit', amount, newBalance, 'Cash deposit', nil)
    addLog(identifier, 'DEPOSIT', '$' .. formatNum(amount) .. ' | Balance: $' .. formatNum(newBalance))

    cb({success = true, balance = newBalance, cash = player.getMoney()})
end)

fw.registerCallback('mid-banking:withdraw', function(src, cb, amount, sourceType)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    amount = tonumber(amount)
    if not amount or amount < Config.MinWithdraw then
        return cb({success = false, message = 'Invalid amount'})
    end
    amount = math.floor(amount)

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    if account.is_frozen == 1 then
        return cb({success = false, message = 'Account is frozen'})
    end

    local limit = sourceType == 'atm' and Config.ATMWithdrawLimit or Config.BankWithdrawLimit
    if limit > 0 and amount > limit then
        return cb({success = false, message = 'Withdrawal limit: $' .. formatNum(limit)})
    end

    if player.getBankMoney() < amount then
        return cb({success = false, message = 'Insufficient funds'})
    end

    player.removeBankMoney(amount)
    player.addMoney(amount)

    local newBalance = player.getBankMoney()
    addTransaction(account.account_number, 'withdraw', amount, newBalance, 'Cash withdrawal', nil)
    addLog(identifier, 'WITHDRAW', '$' .. formatNum(amount) .. ' | Balance: $' .. formatNum(newBalance))

    cb({success = true, balance = newBalance, cash = player.getMoney()})
end)

fw.registerCallback('mid-banking:transfer', function(src, cb, targetAccount, amount, note)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    amount = tonumber(amount)
    if not amount or amount < Config.MinTransfer then
        return cb({success = false, message = 'Invalid amount'})
    end
    amount = math.floor(amount)

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    if account.is_frozen == 1 then
        return cb({success = false, message = 'Account is frozen'})
    end

    if account.account_number == targetAccount then
        return cb({success = false, message = 'Cannot transfer to yourself'})
    end

    local recipient = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE account_number = ?', {targetAccount})
    if not recipient then
        return cb({success = false, message = 'Recipient account not found'})
    end

    local fee = math.floor(amount * (Config.TransferFee / 100))
    local totalCost = amount + fee

    if player.getBankMoney() < totalCost then
        return cb({success = false, message = 'Insufficient funds (incl. fee: $' .. formatNum(fee) .. ')'})
    end

    player.removeBankMoney(totalCost)
    local senderBalance = player.getBankMoney()

    local recipientPlayer = fw.getPlayerByIdentifier(recipient.identifier)
    if recipientPlayer then
        recipientPlayer.addBankMoney(amount)
        TriggerClientEvent('mid-banking:notify', recipientPlayer.source, 'info', 'You received $' .. formatNum(amount) .. ' from ' .. account.account_number)
    else
        fw.addBankMoneyOffline(recipient.identifier, amount)
    end

    local desc = note and #note > 0 and note or 'Bank transfer'
    addTransaction(account.account_number, 'transfer_out', totalCost, senderBalance, desc, targetAccount)

    local recipientBal = 0
    if recipientPlayer then
        recipientBal = recipientPlayer.getBankMoney()
    else
        recipientBal = fw.getBankMoneyOffline(recipient.identifier)
    end
    addTransaction(recipient.account_number, 'transfer_in', amount, recipientBal, desc, account.account_number)

    addLog(identifier, 'TRANSFER', '$' .. formatNum(amount) .. ' to ' .. targetAccount .. (fee > 0 and (' | Fee: $' .. formatNum(fee)) or ''))

    cb({success = true, balance = senderBalance, cash = player.getMoney()})
end)

fw.registerCallback('mid-banking:getTransactions', function(src, cb, page, filter, limit, sharedAccNum)
    local identifier = getIdentifier(src)
    if not identifier then return cb({transactions = {}, total = 0}) end

    page = tonumber(page) or 1
    limit = tonumber(limit) or 10
    local offset = (page - 1) * limit
    local accNum = nil

    if sharedAccNum and #sharedAccNum > 0 then
        local shared = MySQL.single.await(
            'SELECT s.account_number FROM mid_bank_shared s INNER JOIN mid_bank_shared_members m ON m.shared_account_id = s.id WHERE s.account_number = ? AND m.identifier = ?',
            {sharedAccNum, identifier}
        )
        if not shared then return cb({transactions = {}, total = 0}) end
        accNum = shared.account_number
    else
        local account = MySQL.single.await('SELECT account_number FROM mid_bank_accounts WHERE identifier = ?', {identifier})
        if not account then return cb({transactions = {}, total = 0}) end
        accNum = account.account_number
    end

    local where = 'WHERE account_number = ?'
    local params = {accNum}

    if filter and filter ~= 'all' then
        if filter == 'deposit' then
            where = where .. ' AND type = ?'
            params[#params + 1] = 'deposit'
        elseif filter == 'withdraw' then
            where = where .. ' AND type = ?'
            params[#params + 1] = 'withdraw'
        elseif filter == 'transfer' then
            where = where .. ' AND (type = ? OR type = ?)'
            params[#params + 1] = 'transfer_in'
            params[#params + 1] = 'transfer_out'
        end
    end

    local countParams = {}
    for i, v in ipairs(params) do countParams[i] = v end
    local total = tonumber(MySQL.scalar.await('SELECT COUNT(*) FROM mid_bank_transactions ' .. where, countParams)) or 0

    params[#params + 1] = limit
    params[#params + 1] = offset
    local transactions = MySQL.query.await(
        'SELECT * FROM mid_bank_transactions ' .. where .. ' ORDER BY created_at DESC LIMIT ? OFFSET ?',
        params
    )

    cb({transactions = transactions or {}, total = total or 0})
end)

fw.registerCallback('mid-banking:getStats', function(src, cb)
    local identifier = getIdentifier(src)
    if not identifier then return cb({}) end

    local account = MySQL.single.await('SELECT account_number FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({}) end

    local accNum = account.account_number

    local chartData = MySQL.query.await(
        [[SELECT
            DATE(created_at) as day,
            COALESCE(SUM(CASE WHEN type IN ('deposit','transfer_in','interest') THEN amount ELSE 0 END), 0) as income,
            COALESCE(SUM(CASE WHEN type IN ('withdraw','transfer_out','loan_payment') THEN amount ELSE 0 END), 0) as expenses
        FROM mid_bank_transactions
        WHERE account_number = ? AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY DATE(created_at)]],
        {accNum}
    ) or {}

    local chartMap = {}
    for _, row in ipairs(chartData) do
        chartMap[row.day] = row
    end

    local chart = {}
    for i = 6, 0, -1 do
        local ts = os.time() - (i * 86400)
        local dayKey = os.date('%Y-%m-%d', ts)
        local row = chartMap[dayKey]
        chart[#chart + 1] = {
            label = os.date('%a', ts),
            income = tonumber(row and row.income or 0) or 0,
            expenses = tonumber(row and row.expenses or 0) or 0
        }
    end

    local totals = MySQL.single.await(
        [[SELECT
            COALESCE(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END), 0) as deposits,
            COALESCE(SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END), 0) as withdrawals,
            COALESCE(SUM(CASE WHEN type = 'transfer_in' THEN amount ELSE 0 END), 0) as transfers_in,
            COALESCE(SUM(CASE WHEN type = 'transfer_out' THEN amount ELSE 0 END), 0) as transfers_out
        FROM mid_bank_transactions WHERE account_number = ?]],
        {accNum}
    )

    cb({
        chart = chart,
        totals = {
            deposits = tonumber(totals and totals.deposits or 0) or 0,
            withdrawals = tonumber(totals and totals.withdrawals or 0) or 0,
            transfers_in = tonumber(totals and totals.transfers_in or 0) or 0,
            transfers_out = tonumber(totals and totals.transfers_out or 0) or 0
        }
    })
end)

fw.registerCallback('mid-banking:getSharedAccounts', function(src, cb)
    local identifier = getIdentifier(src)
    if not identifier then return cb({}) end

    local results = MySQL.query.await(
        [[SELECT m.role, s.*,
            (SELECT COUNT(*) FROM mid_bank_shared_members WHERE shared_account_id = s.id) as member_count
        FROM mid_bank_shared_members m
        INNER JOIN mid_bank_shared s ON s.id = m.shared_account_id
        WHERE m.identifier = ?]],
        {identifier}
    )

    if not results then return cb({}) end

    local accounts = {}
    for _, m in ipairs(results) do
        accounts[#accounts + 1] = {
            id = m.id,
            account_number = m.account_number,
            name = m.name,
            balance = m.balance,
            role = m.role,
            member_count = tonumber(m.member_count) or 0,
            created_at = m.created_at
        }
    end

    cb(accounts)
end)

fw.registerCallback('mid-banking:getSharedDetails', function(src, cb, sharedId)
    local identifier = getIdentifier(src)
    if not identifier then return cb(nil) end

    local membership = MySQL.single.await(
        'SELECT m.role FROM mid_bank_shared_members m WHERE m.shared_account_id = ? AND m.identifier = ?',
        {sharedId, identifier}
    )
    if not membership then return cb(nil) end

    local shared = MySQL.single.await('SELECT * FROM mid_bank_shared WHERE id = ?', {sharedId})
    if not shared then return cb(nil) end

    local members = fw.getMemberInfo(sharedId) or {}

    local transactions = MySQL.query.await(
        'SELECT * FROM mid_bank_transactions WHERE account_number = ? ORDER BY created_at DESC LIMIT 20',
        {shared.account_number}
    ) or {}

    cb({
        id = shared.id,
        account_number = shared.account_number,
        name = shared.name,
        balance = shared.balance,
        role = membership.role,
        members = members,
        transactions = transactions,
        created_at = shared.created_at
    })
end)

fw.registerCallback('mid-banking:createShared', function(src, cb, name)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    if not name or #name < 2 or #name > 40 then
        return cb({success = false, message = 'Name must be 2-40 characters'})
    end

    name = name:gsub('[^%w%s%-_]', '')

    local myShared = tonumber(MySQL.scalar.await(
        'SELECT COUNT(*) FROM mid_bank_shared WHERE owner_identifier = ?',
        {identifier}
    )) or 0

    if myShared >= 3 then
        return cb({success = false, message = 'Maximum 3 shared accounts per person'})
    end

    local accNum = generateSharedNumber()

    local insertId = MySQL.insert.await(
        'INSERT INTO mid_bank_shared (account_number, name, owner_identifier, balance) VALUES (?, ?, ?, 0)',
        {accNum, name, identifier}
    )

    MySQL.insert.await(
        'INSERT INTO mid_bank_shared_members (shared_account_id, identifier, role) VALUES (?, ?, ?)',
        {insertId, identifier, 'owner'}
    )

    addLog(identifier, 'SHARED_CREATE', 'Created shared account: ' .. name .. ' (' .. accNum .. ')')

    cb({
        success = true,
        account = {
            id = insertId,
            account_number = accNum,
            name = name,
            balance = 0,
            role = 'owner',
            member_count = 1
        }
    })
end)

fw.registerCallback('mid-banking:depositShared', function(src, cb, sharedId, amount)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    amount = tonumber(amount)
    if not amount or amount < 1 then return cb({success = false, message = 'Invalid amount'}) end
    amount = math.floor(amount)

    local membership = MySQL.single.await(
        'SELECT id FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, identifier}
    )
    if not membership then return cb({success = false, message = 'Not a member'}) end

    if player.getMoney() < amount then
        return cb({success = false, message = 'Not enough cash'})
    end

    player.removeMoney(amount)
    MySQL.update.await('UPDATE mid_bank_shared SET balance = balance + ? WHERE id = ?', {amount, sharedId})

    local shared = MySQL.single.await('SELECT * FROM mid_bank_shared WHERE id = ?', {sharedId})
    addTransaction(shared.account_number, 'deposit', amount, shared.balance, 'Shared deposit', identifier)
    addLog(identifier, 'SHARED_DEPOSIT', '$' .. formatNum(amount) .. ' to ' .. shared.name)

    cb({success = true, balance = shared.balance, cash = player.getMoney()})
end)

fw.registerCallback('mid-banking:withdrawShared', function(src, cb, sharedId, amount)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    amount = tonumber(amount)
    if not amount or amount < 1 then return cb({success = false, message = 'Invalid amount'}) end
    amount = math.floor(amount)

    local membership = MySQL.single.await(
        'SELECT role FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, identifier}
    )
    if not membership then return cb({success = false, message = 'Not a member'}) end

    local affected = MySQL.update.await(
        'UPDATE mid_bank_shared SET balance = balance - ? WHERE id = ? AND balance >= ?',
        {amount, sharedId, amount}
    )

    if not affected or affected == 0 then
        return cb({success = false, message = 'Insufficient funds'})
    end

    player.addMoney(amount)

    local shared = MySQL.single.await('SELECT * FROM mid_bank_shared WHERE id = ?', {sharedId})
    addTransaction(shared.account_number, 'withdraw', amount, shared.balance, 'Shared withdrawal', identifier)
    addLog(identifier, 'SHARED_WITHDRAW', '$' .. formatNum(amount) .. ' from ' .. shared.name)

    cb({success = true, balance = shared.balance, cash = player.getMoney()})
end)

fw.registerCallback('mid-banking:inviteShared', function(src, cb, sharedId, targetServerId)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local membership = MySQL.single.await(
        'SELECT role FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, identifier}
    )
    if not membership or (membership.role ~= 'owner' and membership.role ~= 'admin') then
        return cb({success = false, message = 'No permission'})
    end

    local memberCount = tonumber(MySQL.scalar.await(
        'SELECT COUNT(*) FROM mid_bank_shared_members WHERE shared_account_id = ?',
        {sharedId}
    )) or 0

    if memberCount >= Config.MaxSharedMembers then
        return cb({success = false, message = 'Account is full (' .. Config.MaxSharedMembers .. ' members max)'})
    end

    local targetPlayer = fw.getPlayer(tonumber(targetServerId))
    if not targetPlayer then
        return cb({success = false, message = 'Player not found'})
    end

    local targetId = targetPlayer.identifier
    local exists = MySQL.single.await(
        'SELECT id FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, targetId}
    )
    if exists then
        return cb({success = false, message = 'Already a member'})
    end

    MySQL.insert.await(
        'INSERT INTO mid_bank_shared_members (shared_account_id, identifier, role) VALUES (?, ?, ?)',
        {sharedId, targetId, 'member'}
    )

    local shared = MySQL.single.await('SELECT name FROM mid_bank_shared WHERE id = ?', {sharedId})
    TriggerClientEvent('mid-banking:notify', targetPlayer.source, 'info', 'You were added to shared account: ' .. (shared and shared.name or 'Unknown'))
    addLog(identifier, 'SHARED_INVITE', 'Invited ' .. targetId .. ' to shared account #' .. sharedId)

    cb({success = true})
end)

fw.registerCallback('mid-banking:kickShared', function(src, cb, sharedId, memberId)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local membership = MySQL.single.await(
        'SELECT role FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, identifier}
    )
    if not membership or membership.role ~= 'owner' then
        return cb({success = false, message = 'Only the owner can remove members'})
    end

    local target = MySQL.single.await(
        'SELECT identifier, role FROM mid_bank_shared_members WHERE id = ? AND shared_account_id = ?',
        {memberId, sharedId}
    )
    if not target then return cb({success = false, message = 'Member not found'}) end
    if target.role == 'owner' then return cb({success = false, message = 'Cannot remove owner'}) end

    MySQL.query.await('DELETE FROM mid_bank_shared_members WHERE id = ?', {memberId})
    addLog(identifier, 'SHARED_KICK', 'Removed ' .. target.identifier .. ' from shared account #' .. sharedId)

    local kickedPlayer = fw.getPlayerByIdentifier(target.identifier)
    if kickedPlayer then
        local shared = MySQL.single.await('SELECT name FROM mid_bank_shared WHERE id = ?', {sharedId})
        TriggerClientEvent('mid-banking:notify', kickedPlayer.source, 'warning', 'You were removed from: ' .. (shared and shared.name or 'Unknown'))
    end

    cb({success = true})
end)

fw.registerCallback('mid-banking:leaveShared', function(src, cb, sharedId)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local membership = MySQL.single.await(
        'SELECT role FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, identifier}
    )
    if not membership then return cb({success = false, message = 'Not a member'}) end
    if membership.role == 'owner' then return cb({success = false, message = 'Owner cannot leave. Delete the account instead.'}) end

    MySQL.query.await(
        'DELETE FROM mid_bank_shared_members WHERE shared_account_id = ? AND identifier = ?',
        {sharedId, identifier}
    )
    addLog(identifier, 'SHARED_LEAVE', 'Left shared account #' .. sharedId)

    cb({success = true})
end)

fw.registerCallback('mid-banking:deleteShared', function(src, cb, sharedId)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local shared = MySQL.single.await('SELECT * FROM mid_bank_shared WHERE id = ? AND owner_identifier = ?', {sharedId, identifier})
    if not shared then return cb({success = false, message = 'Not the owner'}) end

    if shared.balance > 0 then
        local player = fw.getPlayer(src)
        if player then
            player.addMoney(shared.balance)
        end
    end

    MySQL.query.await('DELETE FROM mid_bank_shared_members WHERE shared_account_id = ?', {sharedId})
    MySQL.query.await('DELETE FROM mid_bank_shared WHERE id = ?', {sharedId})
    MySQL.query.await('DELETE FROM mid_bank_transactions WHERE account_number = ?', {shared.account_number})

    addLog(identifier, 'SHARED_DELETE', 'Deleted shared account: ' .. shared.name .. ' (balance returned: $' .. formatNum(shared.balance) .. ')')

    cb({success = true})
end)

fw.registerCallback('mid-banking:searchPlayers', function(src, cb, query)
    local identifier = getIdentifier(src)
    if not identifier then return cb({}) end

    if not query or #query < 2 then return cb({}) end

    local sanitized = query:gsub('[^%w%s]', '')
    local results = fw.searchPlayers(sanitized, identifier)

    cb(results or {})
end)

fw.registerCallback('mid-banking:transferSavings', function(src, cb, direction, amount)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    amount = tonumber(amount)
    if not amount or amount < 1 then return cb({success = false, message = 'Invalid amount'}) end
    amount = math.floor(amount)

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    if direction == 'to' then
        if player.getBankMoney() < amount then
            return cb({success = false, message = 'Insufficient bank balance'})
        end

        player.removeBankMoney(amount)
        MySQL.update.await('UPDATE mid_bank_accounts SET savings = savings + ? WHERE identifier = ?', {amount, identifier})

        local newSavings = tonumber(MySQL.scalar.await('SELECT savings FROM mid_bank_accounts WHERE identifier = ?', {identifier})) or 0
        local newBalance = player.getBankMoney()

        addTransaction(account.account_number, 'savings_in', amount, newBalance, 'Transfer to savings', nil)
        addLog(identifier, 'SAVINGS_IN', '$' .. formatNum(amount) .. ' to savings')

        cb({success = true, balance = newBalance, savings = newSavings, cash = player.getMoney()})
    elseif direction == 'from' then
        if account.savings < amount then
            return cb({success = false, message = 'Insufficient savings'})
        end

        local affected = MySQL.update.await(
            'UPDATE mid_bank_accounts SET savings = savings - ? WHERE identifier = ? AND savings >= ?',
            {amount, identifier, amount}
        )
        if not affected or affected == 0 then
            return cb({success = false, message = 'Insufficient savings'})
        end

        player.addBankMoney(amount)
        local newSavings = tonumber(MySQL.scalar.await('SELECT savings FROM mid_bank_accounts WHERE identifier = ?', {identifier})) or 0
        local newBalance = player.getBankMoney()

        addTransaction(account.account_number, 'savings_out', amount, newBalance, 'Transfer from savings', nil)
        addLog(identifier, 'SAVINGS_OUT', '$' .. formatNum(amount) .. ' from savings')

        cb({success = true, balance = newBalance, savings = newSavings, cash = player.getMoney()})
    else
        cb({success = false, message = 'Invalid direction'})
    end
end)

fw.registerCallback('mid-banking:getLoans', function(src, cb)
    local identifier = getIdentifier(src)
    if not identifier then return cb({}) end

    local account = MySQL.single.await('SELECT account_number FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({}) end

    local loans = MySQL.query.await(
        'SELECT * FROM mid_bank_loans WHERE account_number = ? ORDER BY created_at DESC',
        {account.account_number}
    )

    cb(loans or {})
end)

fw.registerCallback('mid-banking:takeLoan', function(src, cb, requestedAmount)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    local activeLoan = MySQL.single.await(
        'SELECT id FROM mid_bank_loans WHERE account_number = ? AND status = ?',
        {account.account_number, 'active'}
    )
    if activeLoan then
        return cb({success = false, message = 'You already have an active loan'})
    end

    local amount = tonumber(requestedAmount)
    if not amount or amount < 1000 or amount > Config.MaxLoanAmount then
        return cb({success = false, message = 'Amount must be $1,000 - $' .. formatNum(Config.MaxLoanAmount)})
    end
    amount = math.floor(amount)

    local totalOwed = math.floor(amount * (1 + Config.LoanInterestRate / 100))

    MySQL.insert.await(
        'INSERT INTO mid_bank_loans (account_number, amount, remaining, interest_rate, status) VALUES (?, ?, ?, ?, ?)',
        {account.account_number, amount, totalOwed, Config.LoanInterestRate, 'active'}
    )

    local player = fw.getPlayer(src)
    player.addBankMoney(amount)

    local newBalance = player.getBankMoney()
    addTransaction(account.account_number, 'loan', amount, newBalance, 'Loan received', nil)
    addLog(identifier, 'LOAN', '$' .. formatNum(amount) .. ' loan taken (repay: $' .. formatNum(totalOwed) .. ')')

    cb({success = true, balance = newBalance, cash = player.getMoney()})
end)

fw.registerCallback('mid-banking:payLoan', function(src, cb, loanId, amount)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local player = fw.getPlayer(src)
    if not player then return cb({success = false}) end

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    local loan = MySQL.single.await(
        'SELECT * FROM mid_bank_loans WHERE id = ? AND account_number = ? AND status = ?',
        {loanId, account.account_number, 'active'}
    )
    if not loan then return cb({success = false, message = 'No active loan found'}) end

    amount = tonumber(amount)
    if not amount or amount < 1 then return cb({success = false, message = 'Invalid amount'}) end
    amount = math.floor(amount)

    if amount > loan.remaining then amount = loan.remaining end

    if player.getBankMoney() < amount then
        return cb({success = false, message = 'Insufficient funds'})
    end

    player.removeBankMoney(amount)
    local newRemaining = loan.remaining - amount

    if newRemaining <= 0 then
        MySQL.update.await('UPDATE mid_bank_loans SET remaining = 0, status = ? WHERE id = ?', {'paid', loanId})
    else
        MySQL.update.await('UPDATE mid_bank_loans SET remaining = ? WHERE id = ?', {newRemaining, loanId})
    end

    local newBalance = player.getBankMoney()
    addTransaction(account.account_number, 'loan_payment', amount, newBalance, 'Loan payment', nil)
    addLog(identifier, 'LOAN_PAYMENT', '$' .. formatNum(amount) .. ' payment (remaining: $' .. formatNum(math.max(0, newRemaining)) .. ')')

    cb({success = true, balance = newBalance, cash = player.getMoney(), remaining = math.max(0, newRemaining)})
end)

fw.registerCallback('mid-banking:changePin', function(src, cb, oldPin, newPin)
    local identifier = getIdentifier(src)
    if not identifier then return cb({success = false}) end

    local account = MySQL.single.await('SELECT * FROM mid_bank_accounts WHERE identifier = ?', {identifier})
    if not account then return cb({success = false, message = 'No account'}) end

    local oldHash = hashPin(tostring(oldPin), account.account_number)
    if account.pin ~= oldHash then
        return cb({success = false, message = 'Current PIN is incorrect'})
    end

    if not newPin or #tostring(newPin) ~= Config.PinLength then
        return cb({success = false, message = 'New PIN must be ' .. Config.PinLength .. ' digits'})
    end

    local newHash = hashPin(tostring(newPin), account.account_number)
    MySQL.update.await('UPDATE mid_bank_accounts SET pin = ? WHERE identifier = ?', {newHash, identifier})

    addLog(identifier, 'PIN_CHANGE', 'PIN changed')

    cb({success = true})
end)

fw.registerCallback('mid-banking:getOnlinePlayers', function(src, cb)
    local allPlayers = fw.getAllPlayers()
    local result = {}

    for _, p in pairs(allPlayers) do
        if p.source ~= src then
            result[#result + 1] = {
                id = p.source,
                name = p.getName()
            }
        end
    end

    cb(result)
end)

-- interest loop
CreateThread(function()
    while true do
        Wait(Config.InterestInterval * 60 * 1000)

        local accounts = MySQL.query.await('SELECT * FROM mid_bank_accounts WHERE savings > 0')
        if accounts then
            for _, acc in ipairs(accounts) do
                local interest = math.floor(acc.savings * (Config.SavingsInterestRate / 100))
                if interest > 0 then
                    MySQL.update('UPDATE mid_bank_accounts SET savings = savings + ? WHERE id = ?', {interest, acc.id})
                    addTransaction(acc.account_number, 'interest', interest, acc.savings + interest, 'Savings interest', nil)
                end
            end
        end
    end
end)

-- make sure tables exist on start
MySQL.ready(function()
    local tables = {
        'mid_bank_accounts', 'mid_bank_transactions', 'mid_bank_shared',
        'mid_bank_shared_members', 'mid_bank_loans', 'mid_bank_logs'
    }
    for _, tbl in ipairs(tables) do
        local exists = MySQL.scalar.await("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = ?", {tbl})
        if not exists or tonumber(exists) == 0 then
            print('^1[mid-banking]^0 Missing table: ' .. tbl .. ' — Please run install.sql')
            return
        end
    end
    print('^2[mid-banking]^0 Database tables ready')
end)
