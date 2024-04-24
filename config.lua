return {
    HUD = {
        framework = 'qbx_core',          -- Choose between 'qbx_core', 'qb-core' or 'esx'. If you have renamed 'qb-core', use that. (Update comment lines in fxmanifest accordingly)
        updateDelay = 100,               -- Delay in milliseconds for HUD updates
        useMPH = true,                   -- If set to true, speed calculations will be in MPH; if false, KPH will be used (Adjust content in styles.css to reflect the chosen unit)
        disableStress = false,           -- Set to true to completely disable stress for all players
        enableCayoMiniMap = true,        -- Set to true to enable the Cayo Perico minimap, false to disable
        gearScript = false,              -- Set to true if using a gear script; otherwise, leave as false
        gearExport = 'qbx_transmission', -- Name of your transmission/gear script. Example: 'qbx_transmission'. (I use HRS Handling, which is paid.)

        stress = {
            chance = 0.05, -- Percentage chance of stress when shooting (0-1)
            minForShaking = 50, -- Minimum stress level for screen shaking
            minForSpeeding = 125, --- Stress begins when speed exceeds this value while buckled
            minForSpeedingUnbuckled = 50, -- Stress begins when speed exceeds this value while unbuckled
            whitelistedWeapons = { -- List of weapons that do not induce stress
                `weapon_petrolcan`,
                `weapon_hazardcan`,
                `weapon_fireextinguisher`,
            },
            blurIntensity = { -- Blur intensity levels for different stress levels
                [1] = {min = 50, max = 60, intensity = 1500},
                [2] = {min = 60, max = 70, intensity = 2000},
                [3] = {min = 70, max = 80, intensity = 2500},
                [4] = {min = 80, max = 90, intensity = 2700},
                [5] = {min = 90, max = 100, intensity = 3000},
            },
            effectInterval = { -- Effect interval for different stress levels
                [1] = {min = 50, max = 60, timeout = math.random(50000, 60000)},
                [2] = {min = 60, max = 70, timeout = math.random(40000, 50000)},
                [3] = {min = 70, max = 80, timeout = math.random(30000, 40000)},
                [4] = {min = 80, max = 90, timeout = math.random(20000, 30000)},
                [5] = {min = 90, max = 100, timeout = math.random(15000, 20000)},
            },
        },

        vehClassStress = { -- Enable/Disable stress from vehicle classes
            ["0"] = true,         -- Compacts
            ["1"] = true,         -- Sedans
            ["2"] = true,         -- SUVs
            ["3"] = true,         -- Coupes
            ["4"] = true,         -- Muscle
            ["5"] = true,         -- Sports Classics
            ["6"] = true,         -- Sports
            ["7"] = true,         -- Super
            ["8"] = true,         -- Motorcycles
            ["9"] = true,         -- Off Road
            ["10"] = true,        -- Industrial
            ["11"] = true,        -- Utility
            ["12"] = true,        -- Vans
            ["13"] = false,       -- Cycles
            ["14"] = false,       -- Boats
            ["15"] = false,       -- Helicopters
            ["16"] = false,       -- Planes
            ["18"] = false,       -- Emergency
            ["19"] = false,       -- Military
            ["20"] = false,       -- Commercial
            ["21"] = false        -- Trains
        },

        whitelistedVehicles = { -- List of vehicles that do not induce stress from speeding
            --[`adder`] = true
        },

        whitelistedJobs = { -- List of jobs or job types for which stress is completely disabled (ESX doesn't support job types!)
            ["leo"] = true,
            ["ambulance"] = true
        },
    },
}
