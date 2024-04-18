local config = require 'config'
local hud = config.HUD
local ResetStress = false

lib.addCommand('cash', {help = 'Check Cash Balance'}, function(source, args)
    local Player = exports.qbx_core:GetPlayer(source)
    local cashamount = Player.PlayerData.money.cash
    TriggerClientEvent('hud:client:ShowAccounts', source, 'cash', cashamount)
end)

lib.addCommand('bank', { help = 'Check Bank Balance'}, function(source, args)
    local Player = exports.qbx_core:GetPlayer(source)
    local bankamount = Player.PlayerData.money.bank
    TriggerClientEvent('hud:client:ShowAccounts', source, 'bank', bankamount)
end)

RegisterNetEvent('hud:server:GainStress', function(amount)
    if hud.disableStress then return end
    local src = source
    local Player = exports.qbx_core:GetPlayer(src)
    local Job = Player.PlayerData.job.name
    local JobType = Player.PlayerData.job.type
    local newStress
    if not Player or hud.whitelistedJobs[JobType] or hud.whitelistedJobs[Job] then return end
    if not ResetStress then
        if not Player.PlayerData.metadata.stress then
            Player.PlayerData.metadata.stress = 0
        end
        newStress = Player.PlayerData.metadata.stress + amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('ox_lib:Notify', src, 'Stress Gained', 'error', 1500)
end)

RegisterNetEvent('hud:server:RelieveStress', function(amount)
    if hud.disableStress then return end
    local src = source
    local Player = exports.qbx_core:GetPlayer(src)
    local newStress
    if not Player then return end
    if not ResetStress then
        if not Player.PlayerData.metadata.stress then
            Player.PlayerData.metadata.stress = 0
        end
        newStress = Player.PlayerData.metadata.stress - amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    Player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    TriggerClientEvent('ox_lib:Notify', src, 'Relieved Stress')
end)