local Framework = nil

if Config.Framework == 'esx' then
    Framework = exports['es_extended']:getSharedObject()
elseif Config.Framework == 'qb' then
    Framework = exports['qb-core']:GetCoreObject()
elseif Config.Framework == 'ox' then
    Framework = {}
end

local function TriggerCallback(name, cb, ...)
    if Config.Framework == 'esx' then
        Framework.TriggerServerCallback(name, cb, ...)
    elseif Config.Framework == 'qb' then
        Framework.Functions.TriggerCallback(name, cb, ...)
    else
        lib.callback(name, false, cb, ...)
    end
end

local function Notify(msg, nType)
    if Config.NotificationType == 'ox_lib' then
        lib.notify({title = 'Mid Bank', description = msg, type = nType, position = 'top-right'})
    elseif Config.NotificationType == 'esx' and Config.Framework == 'esx' then
        Framework.ShowNotification(msg)
    elseif Config.NotificationType == 'qb' and Config.Framework == 'qb' then
        Framework.Functions.Notify(msg, nType)
    end
end

local isBankOpen = false
local isAtmOpen = false
local sourceType = nil

local function openUI(mode)
    if isBankOpen or isAtmOpen then return end

    sourceType = mode

    TriggerCallback('mid-banking:getAccount', function(account)
        if mode == 'bank' then
            isBankOpen = true
        else
            isAtmOpen = true
        end

        SetNuiFocus(true, true)
        SendNUIMessage({
            action = 'open',
            data = {
                mode = mode,
                account = account,
                pinLength = Config.PinLength,
                quickAmounts = mode == 'atm' and Config.QuickWithdrawAmounts or Config.QuickAmounts,
                enableLoans = Config.EnableLoans
            }
        })

        if mode == 'bank' then
            PlaySoundFrontend(-1, 'CONTINUE', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
        else
            PlaySoundFrontend(-1, 'ATM_WINDOW', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
        end
    end)
end

local function closeUI()
    if not isBankOpen and not isAtmOpen then return end

    SetNuiFocus(false, false)
    SendNUIMessage({action = 'close'})

    isBankOpen = false
    isAtmOpen = false
    sourceType = nil

    PlaySoundFrontend(-1, 'BACK', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
end

RegisterNUICallback('close', function(_, cb)
    closeUI()
    cb('ok')
end)

RegisterNUICallback('notify', function(data, cb)
    Notify(data.message, data.type)
    cb('ok')
end)

RegisterNUICallback('playSound', function(data, cb)
    if data.sound == 'click' then
        PlaySoundFrontend(-1, 'NAV_UP_DOWN', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
    elseif data.sound == 'success' then
        PlaySoundFrontend(-1, 'PURCHASE', 'HUD_LIQUOR_STORE_SOUNDSET', true)
    elseif data.sound == 'error' then
        PlaySoundFrontend(-1, 'ERROR', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
    elseif data.sound == 'pin' then
        PlaySoundFrontend(-1, 'HIGHLIGHT_NAV_UP_DOWN', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true)
    end
    cb('ok')
end)

RegisterNUICallback('register', function(data, cb)
    TriggerCallback('mid-banking:register', function(res) cb(res) end, data.pin)
end)

RegisterNUICallback('verifyPin', function(data, cb)
    TriggerCallback('mid-banking:verifyPin', function(success, message)
        if success then
            TriggerCallback('mid-banking:getAccount', function(account)
                cb({success = true, account = account})
            end)
        else
            cb({success = false, message = message})
        end
    end, data.pin)
end)

-- simple nui -> server forwards
local function nuiForward(name, getArgs)
    RegisterNUICallback(name, function(data, cb)
        local args = getArgs and getArgs(data) or {}
        TriggerCallback('mid-banking:' .. name, function(res) cb(res) end, table.unpack(args))
    end)
end

nuiForward('deposit', function(d) return {d.amount, sourceType} end)
nuiForward('withdraw', function(d) return {d.amount, sourceType} end)
nuiForward('transfer', function(d) return {d.accountNumber, d.amount, d.note} end)
nuiForward('getTransactions', function(d) return {d.page, d.filter, d.limit, d.sharedAccNum or ''} end)
nuiForward('getStats')
nuiForward('getSharedAccounts')
nuiForward('getSharedDetails', function(d) return {d.sharedId} end)
nuiForward('createShared', function(d) return {d.name} end)
nuiForward('depositShared', function(d) return {d.sharedId, d.amount} end)
nuiForward('withdrawShared', function(d) return {d.sharedId, d.amount} end)
nuiForward('inviteShared', function(d) return {d.sharedId, d.playerId} end)
nuiForward('kickShared', function(d) return {d.sharedId, d.memberId} end)
nuiForward('leaveShared', function(d) return {d.sharedId} end)
nuiForward('deleteShared', function(d) return {d.sharedId} end)
nuiForward('searchPlayers', function(d) return {d.query} end)
nuiForward('transferSavings', function(d) return {d.direction, d.amount} end)
nuiForward('getLoans')
nuiForward('takeLoan', function(d) return {d.amount} end)
nuiForward('payLoan', function(d) return {d.loanId, d.amount} end)
nuiForward('changePin', function(d) return {d.oldPin, d.newPin} end)
nuiForward('getOnlinePlayers')
nuiForward('getAccount')

RegisterNetEvent('mid-banking:notify', function(nType, message)
    Notify(message, nType)
end)

CreateThread(function()
    for _, bank in ipairs(Config.Banks) do
        local blip = AddBlipForCoord(bank.coords.x, bank.coords.y, bank.coords.z)
        SetBlipSprite(blip, Config.BankBlip.sprite)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, Config.BankBlip.scale)
        SetBlipColour(blip, Config.BankBlip.color)
        SetBlipAsShortRange(blip, true)
        BeginTextCommandSetBlipName('STRING')
        AddTextComponentSubstringPlayerName(Config.BankBlip.label)
        EndTextCommandSetBlipName(blip)
    end
end)

CreateThread(function()
    local target = exports[Config.TargetSystem]

    for _, bank in ipairs(Config.Banks) do
        target:addBoxZone({
            coords = bank.coords,
            size = vec3(2.5, 2.5, 3.0),
            rotation = bank.heading,
            debug = false,
            options = {
                {
                    name = 'mid_bank_' .. tostring(bank.coords),
                    icon = 'fas fa-university',
                    label = bank.label or 'Enter Bank',
                    onSelect = function()
                        openUI('bank')
                    end
                }
            }
        })
    end

    target:addModel(Config.ATMModels, {
        {
            name = 'mid_atm_use',
            icon = 'fas fa-credit-card',
            label = 'Use ATM',
            onSelect = function()
                openUI('atm')
            end
        }
    })
end)
