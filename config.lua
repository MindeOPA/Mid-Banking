Config = {}

Config.Framework = 'esx' -- 'esx' or 'qb'
Config.NotificationType = 'ox_lib' -- 'ox_lib' / 'esx' / 'qb'
Config.TargetSystem = 'ox_target' -- 'ox_target' / 'qb-target'

Config.PinLength = 4
Config.MaxPinAttempts = 3 -- set to 0 to disable
Config.FreezeDuration = 15 -- lockout minutes

Config.StartingBalance = 0
Config.SavingsInterestRate = 0.1 -- % per cycle
Config.InterestInterval = 60 -- minutes between interest calc

Config.EnableLoans = true
Config.MaxLoanAmount = 500000
Config.LoanInterestRate = 5.0 -- %

Config.MaxSharedMembers = 6
Config.TransferFee = 0 -- % fee on transfers, 0 = free

-- transaction limits (0 = no limit)
Config.ATMWithdrawLimit = 50000
Config.ATMDepositLimit = 50000
Config.BankWithdrawLimit = 0
Config.BankDepositLimit = 0

Config.MinDeposit = 1
Config.MinWithdraw = 1
Config.MinTransfer = 1

-- discord logging
Config.EnableWebhookLogs = false
Config.WebhookURL = ''
Config.WebhookColor = 65280

Config.QuickWithdrawAmounts = {100, 500, 1000, 5000, 10000, 50000}
Config.QuickAmounts = {100, 500, 1000, 5000, 10000, 50000}

Config.ATMModels = {
    'prop_atm_01',
    'prop_atm_02',
    'prop_atm_03',
    'prop_fleeca_atm'
}

Config.Banks = {
    {coords = vector3(149.0, -1041.0, 29.35), heading = 340.0, label = 'Fleeca Bank - Legion Square'},
    {coords = vector3(313.3, -279.45, 54.15), heading = 340.0, label = 'Fleeca Bank - Alta'},
    {coords = vector3(-351.0, -50.5, 49.0), heading = 340.0, label = 'Fleeca Bank - Burton'},
    {coords = vector3(-1213.0, -331.55, 37.8), heading = 340.0, label = 'Fleeca Bank - Rockford Hills'},
    {coords = vector3(-2962.0, 482.65, 15.7), heading = 340.0, label = 'Fleeca Bank - Great Ocean'},
    {coords = vector3(1175.25, 2707.45, 38.2), heading = 340.0, label = 'Fleeca Bank - Route 68'},
    {coords = vector3(-112.15, 6469.95, 31.7), heading = 340.0, label = 'Fleeca Bank - Paleto Bay'},
}

Config.BankBlip = {
    sprite = 108,
    color = 2,
    scale = 0.8,
    label = 'Bank'
}

-- set sprite to 0 to hide atm blips
Config.ATMBlip = {
    sprite = 0,
    color = 2,
    scale = 0.5,
    label = 'ATM'
}
