local config = require 'config'
local hud = config.HUD
local ResetStress = false

--[[
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
]]

RegisterNetEvent('hud:server:GainStress', function(amount)
    if hud.disableStress then return end
    local src = source
    local player = exports.qbx_core:GetPlayer(src)
    local Job = player.PlayerData.job.name
    local JobType = player.PlayerData.job.type
    local newStress
    if not player or hud.whitelistedJobs[JobType] or hud.whitelistedJobs[Job] then return end
    if not ResetStress then
        if not player.PlayerData.metadata.stress then
            player.PlayerData.metadata.stress = 0
        end
        newStress = player.PlayerData.metadata.stress + amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    exports.qbx_core:Notify(src, "Stress gained", 'inform', 2500, nil, nil, {'#141517', '#ffffff'}, 'brain', '#C53030')
end)

RegisterNetEvent('hud:server:RelieveStress', function(amount)
    if hud.disableStress then return end
    local src = source
    local player = exports.qbx_core:GetPlayer(src)
    local newStress
    if not player then return end
    if not ResetStress then
        if not player.PlayerData.metadata.stress then
            player.PlayerData.metadata.stress = 0
        end
        newStress = player.PlayerData.metadata.stress - amount
        if newStress <= 0 then newStress = 0 end
    else
        newStress = 0
    end
    if newStress > 100 then
        newStress = 100
    end
    player.Functions.SetMetaData('stress', newStress)
    TriggerClientEvent('hud:client:UpdateStress', src, newStress)
    exports.qbx_core:Notify(src, "Relived stress", 'inform', 2500, nil, nil, {'#141517', '#ffffff'}, 'brain', '#0F52BA')
end)
