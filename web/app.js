$(document).ready(function(){
    display(false)
    
    var defaultValues = {
        health: 80,
        armor: 25,
        thirst: 80,
        hunger: 80,
        stamina: 80,
        stress: 25
    };

    var vehicleMaxValues = {
        '1920x1080': { maxHeight: 855, maxWidth: 1617 },
        '2560x1080': { maxHeight: 855, maxWidth: 2257 },
        '2560x1440': { maxHeight: 1142, maxWidth: 2154 }
        // Add more resolutions here if needed
    };

    var playerMaxValues = {
        '1920x1080': { maxHeight: 1052, maxWidth: 1537 },
        '2560x1080': { maxHeight: 1052, maxWidth: 2177 },
        '2560x1440': { maxHeight: 1412, maxWidth: 2177 }
        // Add more resolutions here if needed
    };

    function updateHUD(data) {
        updatePlayerHUD(data.player);
        updateVehicleHUD(data.vehicle);
        updateRPM(data.vehicle.rpm);
    }

    function previewUpdateHUD() {
        var defaultData = {
            player: defaultValues,
            vehicle: {
                speed: 60,
                fuel: 100,
                gear: 4,
                rpm: 2000,
                seatbeltOn: false,
                altitude: 500,
                altitudetexto: 'ALT',
                street1: 'BAYTREE CANYON RD',
                street2: 'SENORA RD',
                direction: 'E'
            }
        };

        updateHUD(defaultData);
        display(true);
    }

    function updatePlayerHUD(data) {
        if (data.health <= defaultValues.health) {
            $('#health-container').fadeIn('slow');
            $('#health').css('width', data.health + '%');
        } else {
            $('#health-container').fadeOut('slow');
        }

        if (data.armor >= defaultValues.armor) {
            $('#armor-container').fadeIn('slow');
            $('#armor').css('width', data.armor + '%');
        } else {
            $('#armor-container').fadeOut('slow');
        }

        if (data.thirst <= defaultValues.thirst) {
            $('#thirst-container').fadeIn('slow');
            $('#thirst').css('width', data.thirst + '%');
        } else {
            $('#thirst-container').fadeOut('slow');
        }

        if (data.hunger <= defaultValues.hunger) {
            $('#hunger-container').fadeIn('slow');
            $('#hunger').css('width', data.hunger + '%');
        } else {
            $('#hunger-container').fadeOut('slow');
        }

        if (data.stamina <= defaultValues.stamina) {
            $('#stamina-container').fadeIn('slow');
            $('#stamina').css('width', data.stamina + '%');
        } else {
            $('#stamina-container').fadeOut('slow');
        }

        if (data.stress >= defaultValues.stress) {
            $('#stress-container').fadeIn('slow')
            $('#stress').css('width', data.stress+'%')
        } else { $('#stress-container').fadeOut('slow') }

        if (data.voice <= 1.5) {
            $('#voice').css('width', '20px');
        } else if (data.voice <= 3.0) {
            $('#voice').css('width', '40px');
        } else {
            $('#voice').css('width', '60px');
        }

        if (data.radio) {
            $("#voice").css("background", "rgba(214, 71, 99, 0.8)");
        } else if (data.talking) {
            $("#voice").css("background", "rgba(240, 252, 25, 0.8)");
        } else {
            $("#voice").css("background", "rgba(212, 212, 212, 0.8)");
        }
    }

    function updateVehicleHUD(data) {
        $('#speed').text(data.speed)

        $('#fuel').text(data.fuel)

        $('#gear').text(data.gear)

        $('#rpm').text(data.rpm)

        if (data.seatbeltOn === false) {
            $('#seatbelt').css('color', 'red');
        } else {
            $('#seatbelt').css('color', 'green');
        }

        $('#altitude').text(data.altitude)

        $('#alt-txt').text(data.altitudetexto)

        $('#street1').text(data.street1)

        $('#street2').text(data.street2)

        $('#direction').text(data.direction)
    }

    function display(bool) {
        if (bool) {
            $('#ui-container').show();
            $('#UIElementGap, #vehicleHudHeight, #vehicleHudWidth, #playerHudHeight, #playerHudWidth').each(function() {
                var $this = $(this);
                var value = $this.val();
                var sliderId = $this.attr('id');
                updateSliderLabel(sliderId, value);
            });
        } else {
            $('#ui-container').hide();
        }
    }

    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === 'ui') {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
    })

    document.onkeyup = function(data) {
        if (data.which == 27) {
            $.post('https://al_hud/exit', JSON.stringify({}));
            return
        }
    };

    function setHudSizeLimits(vehicleMaxValues, playerMaxValues) {
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
    
        var defaultMaxHeight = 855; // 1920
        var defaultMaxWidth = 1617; // 1080
    
        var resolutionKey = screenWidth + 'x' + screenHeight;
    
        var vehicleMaxHeight = vehicleMaxValues[resolutionKey] ? vehicleMaxValues[resolutionKey].maxHeight : defaultMaxHeight;
        var vehicleMaxWidth = vehicleMaxValues[resolutionKey] ? vehicleMaxValues[resolutionKey].maxWidth : defaultMaxWidth;
    
        var playerMaxHeight = playerMaxValues[resolutionKey] ? playerMaxValues[resolutionKey].maxHeight : defaultMaxHeight;
        var playerMaxWidth = playerMaxValues[resolutionKey] ? playerMaxValues[resolutionKey].maxWidth : defaultMaxWidth;
    
        $('#vehicleHudHeight').attr('max', vehicleMaxHeight);
        $('#vehicleHudWidth').attr('max', vehicleMaxWidth);
    
        $('#playerHudHeight').attr('max', playerMaxHeight);
        $('#playerHudWidth').attr('max', playerMaxWidth);
    }

    function setDefaultSizeValues() {
        var defaultHeight, defaultWidth;
    
        if (window.screen.width === 1920 && window.screen.height === 1080) {
            defaultHeight = 32;
            defaultWidth = 9;
        } else if (window.screen.width === 2560 && window.screen.height === 1080) {
            defaultHeight = 32;
            defaultWidth = 23;
        } else {
            defaultHeight = 45; // Default height value for resolutions
            defaultWidth = 12; // Default width value for resolutions
        }
    
        $('#vehicleHudHeight').val(defaultHeight);
        $('#vehicleHudWidth').val(defaultWidth);
    }
    

    $('.vehicleHudHeightReset').click(function() {
        $('#vehicleHudHeight').val($('#vehicleHudHeight').attr('value'));
    });

    $('.vehicleHudWidthReset').click(function() {
        $('#vehicleHudWidth').val($('#vehicleHudWidth').attr('value'));
    });

    $('.playerHudHeightReset').click(function() {
        $('#playerHudHeight').val($('#playerHudHeight').attr('value'));
    });

    $('.playerHudWidthReset').click(function() {
        $('#playerHudWidth').val($('#playerHudWidth').attr('value'));
    });

    window.addEventListener('message', function(event) {
        const data = event.data;
        if (data.action == 'showPlayerHUD') {
            $('body').fadeIn('slow')
        } else if (data.action == 'hidePlayerHUD') {
            $('body').fadeOut('slow')
        } else if (data.action == 'updatePlayerHUD') {
            updatePlayerHUD(data)
        } else if (data.action == 'showVehicleHUD') {
            $('#vehicle-hud-container').fadeIn('slow')
        } else if(data.action == 'hideVehicleHUD') {
            $('#vehicle-hud-container').fadeOut('fast')
        } else if (data.action == 'updateVehicleHUD') {
            updateVehicleHUD(data)
        }
    });

    function updateRPM(rpmValue) {
        var roundedRPM = Math.round(rpmValue);
        $('#rpm').text(roundedRPM);
    }
    
    // RPM Counter Updater //
    window.addEventListener('message', function(event) {
        var rpm = event.data.rpm;
        if (rpm !== undefined) {
            //console.log('Received RPM: ' + rpm);
            updateRPM((rpm / 1) * 10000);
        } else {
            //console.log('RPM data not received');
        }
    });

    const colorPicker = document.getElementById('colorPicker');
    const menuButtons = document.getElementById('menubuttons');

    menuButtons.addEventListener('click', function() {
        colorPicker.click();
    });

    colorPicker.addEventListener('change', function() {
        const newColor = this.value;
        menuButtons.style.backgroundColor = newColor;
        document.documentElement.style.setProperty('--main-color', newColor);
    
        if (isDarkColor(newColor)) {
            menuButtons.style.color = 'white';
        } else {
            menuButtons.style.color = 'black';
        }
    });

    document.getElementById('resetColor').addEventListener('click', function() {
        const defaultColor = '#82fd35';
        menuButtons.style.backgroundColor = defaultColor;
        menuButtons.style.color = isDarkColor(defaultColor) ? 'white' : 'black';
        document.documentElement.style.setProperty('--main-color', defaultColor);
        colorPicker.value = defaultColor;
    });
    
    document.getElementById('changeRotation').addEventListener('click', function() {
        var playerHudContainer = document.getElementById('player-hud-container');
        if (playerHudContainer.style.flexDirection === 'column') {
            playerHudContainer.style.flexDirection = 'row';
        } else {
            playerHudContainer.style.flexDirection = 'column';
        }
    });

    function isDarkColor(color) {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return (r * 0.299 + g * 0.587 + b * 0.114) < 186;
    }

    function updateHUDColor(color) {
        document.documentElement.style.setProperty('--main-color', color);
        $('#menubuttons').css('background-color', color);

        if (isDarkColor(color)) {
            $('#menubuttons').css('color', '#FFFFFF');
        } else {
            $('#menubuttons').css('color', '#000000');
        }
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const defaultMainColor = rootStyle.getPropertyValue('--main-color').trim();
    updateHUDColor(defaultMainColor);
    $('#colorPicker').val(defaultMainColor);
    $('#colorPicker').change(function() {
        const newColor = $(this).val();
        updateHUDColor(newColor);
    });

    $('#UIElementGap').on('input', function() {
        var gapValue = $(this).val() + 'px';
        $('#player-hud-container').css('gap', gapValue);
    });

    $('.UIGapReset').click(function() {
        $('#UIElementGap').val(2);
        $('#player-hud-container').css('gap', '2px');
        updateSliderLabel('UIElementGap', 2);
    });

    $('#vehicleHudHeight').on('input', function() {
        var heightValue = $(this).val();
        // console.log('Height Value:', heightValue);
        $('#vehicle-hud-container').css('bottom', heightValue + 'px');
    });

    $('.vehicleHudHeightReset').click(function() {
        var defaultHeight;
    
        // Edit here to add more reset values
        if (window.screen.width === 1920 && window.screen.height === 1080) {
            defaultHeight = 32;
        } else if (window.screen.width === 2560 && window.screen.height === 1080) {
            defaultHeight = 32;
        } else {
            defaultHeight = 45;
        }

        $('#vehicleHudHeight').val(defaultHeight);
        $('#vehicle-hud-container').css('bottom', defaultHeight + 'px');
        updateSliderLabel('vehicleHudHeight', defaultHeight);
    });

    $('#vehicleHudWidth').on('input', function() {
        var widthValue = $(this).val();
        // console.log('Height Value:', widthValue);
        $('#vehicle-hud-container').css('left', widthValue + 'px');
    });

    $('.vehicleHudWidthReset').click(function() {
        var defaultWidth;
    
        // Edit here to add more reset values
        if (window.screen.width === 1920 && window.screen.height === 1080) {
            defaultWidth = 9;
        } else if (window.screen.width === 2560 && window.screen.height === 1080) {
            defaultWidth = 23;
        } else {
            defaultWidth = 12;
        }
    
        $('#vehicleHudWidth').val(defaultWidth);
        $('#vehicle-hud-container').css('left', defaultWidth + 'px');
        updateSliderLabel('vehicleHudWidth', defaultWidth);
    });

    $('#playerHudHeight').on('input', function() {
        var heightValue = $(this).val();
        // console.log('Height Value:', heightValue);
        $('#player-hud-container').css('bottom', heightValue + 'px');
    });

    $('.playerHudHeightReset').click(function() {
        var defaultPlayerHeight = 5;

        $('#playerHudHeight').val(defaultPlayerHeight);
        $('#player-hud-container').css('bottom', defaultPlayerHeight + 'px');
        updateSliderLabel('playerHudHeight', defaultPlayerHeight);
    });

    $('#playerHudWidth').on('input', function() {
        var widthValue = $(this).val();
        // console.log('Height Value:', widthValue);
        $('#player-hud-container').css('left', widthValue + 'px');
    });

    $('.playerHudWidthReset').click(function() {
        defaultPlayerWidth = 12;
    
        $('#playerHudWidth').val(defaultPlayerWidth);
        $('#player-hud-container').css('left', defaultPlayerWidth + 'px');
        updateSliderLabel('playerHudWidth', defaultPlayerWidth);
    });

    $('.add-new').click(function() {
        var $select = $('#HUD');
        var numberOfOptions = $select.children('option').length;

        if (numberOfOptions >= 10) {
            return;
        }
        var newVersionNumber = numberOfOptions + 1;
        $select.append($('<option>', {
            value: newVersionNumber,
            text: newVersionNumber,
            selected: true
        }));
        $select.val(newVersionNumber);
    });

    function updateSliderLabel(sliderId, value) {
        var labelId = sliderId + 'Label';
        var $label = $('#' + labelId);

        if ($label.length === 0) {
            $label = $('<div></div>', {
                id: labelId,
                class: 'slider-label'
            }).insertBefore('#' + sliderId);
        }

        $label.text('Value: ' + value);

        setTimeout(function() {
            var $slider = $('#' + sliderId);
            var sliderPosition = $slider.position();
            $label.css({
                top: sliderPosition.top - 25,
                left: sliderPosition.left,
                position: 'absolute'
            });
        });
    }

    $('#UIElementGap, #vehicleHudHeight, #vehicleHudWidth, #playerHudHeight, #playerHudWidth').each(function() {
        var $this = $(this);
        var value = $this.val();
        var sliderId = $this.attr('id');
        updateSliderLabel(sliderId, value);
    });

    $('#UIElementGap, #vehicleHudHeight, #vehicleHudWidth, #playerHudHeight, #playerHudWidth').on('input', function() {
        var $this = $(this);
        var value = $this.val();
        var sliderId = $this.attr('id');
        updateSliderLabel(sliderId, value);
    });

    $(window).resize(function() {
        $('#UIElementGap, #vehicleHudHeight, #vehicleHudWidth, #playerHudHeight, #playerHudWidth').each(function() {
            var $this = $(this);
            var value = $this.val();
            var sliderId = $this.attr('id');
            updateSliderLabel(sliderId, value);
        });
    });

    $('#healthvalue, #armorvalue, #thirstvalue, #hungervalue, #staminavalue, #stressvalue').on('input', function() {
        var id = $(this).attr('id');
        var value = $(this).val();
        value = value.replace(/[^0-9]/g, '');
        value = parseInt(value);
        if (isNaN(value)) {
            value = 0;
        }
        value = Math.min(Math.max(value, 0), 100);
        $(this).val(value);

        if (id === 'healthvalue') {
            defaultValues.health = value;
        } else if (id === 'armorvalue') {
            defaultValues.armor = value;
        } else if (id === 'thirstvalue') {
            defaultValues.thirst = value;
        } else if (id === 'hungervalue') {
            defaultValues.hunger = value;
        } else if (id === 'staminavalue') {
            defaultValues.stamina = value;
        } else if (id === 'stressvalue') {
            defaultValues.stress = value;
        }
    });

    $('.resetHealth').click(function() {
        $('#healthvalue').val(80);
        defaultValues.health = 80;
    });

    $('.resetArmor').click(function() {
        $('#armorvalue').val(10);
        defaultValues.armor = 10;
    });

    $('.resetThirst').click(function() {
        $('#thirstvalue').val(80);
        defaultValues.armor = 80;
    });

    $('.resetHunger').click(function() {
        $('#hungervalue').val(80);
        defaultValues.hunger = 80;
    });

    $('.resetStamina').click(function() {
        $('#staminavalue').val(80);
        defaultValues.stamina = 80;
    });

    $('.resetStress').click(function() {
        $('#stressvalue').val(10);
        defaultValues.stress = 10;
    });

    $('#resetAll').on('click', function() {
        const defaultColor = '#82fd35';
        $('#menubuttons').css('background-color', defaultColor);
        $('#menubuttons').css('color', isDarkColor(defaultColor) ? 'white' : 'black');
        document.documentElement.style.setProperty('--main-color', defaultColor);
        $('#colorPicker').val(defaultColor);
        $('#player-hud-container').css('flex-direction', 'row');
    
        $('#healthvalue').val('80');
        defaultValues.health = 80;
        $('#armorvalue').val('10');
        defaultValues.armor = 10;
        $('#thirstvalue').val('80');
        defaultValues.thirst = 80;
        $('#hungervalue').val('80');
        defaultValues.hunger = 80;
        $('#staminavalue').val('80');
        defaultValues.stamina = 80;
        $('#stressvalue').val('10');
        defaultValues.stress = 10;

        $('.vehicleHudHeightReset').click();
        $('.vehicleHudWidthReset').click();
        $('.playerHudHeightReset').click();
        $('.playerHudWidthReset').click();
    });

    setDefaultSizeValues();
    setHudSizeLimits(vehicleMaxValues, playerMaxValues);
    //previewUpdateHUD();
});
