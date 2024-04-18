$(document).ready(function(){
    display(false)
    function previewUpdateHUD() {
        const playerData = {
            health: 75,
            armor: 50,
            thirst: 80,
            hunger: 80,
            stamina: 60,
            stress: 50,
            voice: 4,
            talking: false
        };
        
        const vehicleData = {
            speed: 60,
            fuel: 100,
            gear: 4,
            rpm: 0.2,
            seatbeltOn: false,
            altitude: 500,
            altitudetexto: 'ALT',
            street1: 'BAYTREE CANYON RD',
            street2: 'SENORA RD', 
            direction: 'E'
        };

        updatePlayerHUD(playerData);
        updateVehicleHUD(vehicleData);
        updateRPM(vehicleData.rpm * 10000);
        display(true)
    }

    function updatePlayerHUD(data) {
        if (data.health <= 80) {
            $('#health-container').fadeIn('slow');
            $('#health').css('width', data.health + '%');
        } else {
            $('#health-container').fadeOut('slow');
        }

        if (data.armor > 0) {
            $('#armor-container').fadeIn('slow');
            $('#armor').css('width', data.armor + '%');
        } else {
            $('#armor-container').fadeOut('slow');
        }

        if (data.thirst <= 80) {
            $('#thirst-container').fadeIn('slow');
            $('#thirst').css('width', data.thirst + '%');
        } else {
            $('#thirst-container').fadeOut('slow');
        }

        if (data.hunger <= 80) {
            $('#hunger-container').fadeIn('slow');
            $('#hunger').css('width', data.hunger + '%');
        } else {
            $('#hunger-container').fadeOut('slow');
        }

        if (data.stamina <= 80) {
            $('#stamina-container').fadeIn('slow');
            $('#stamina').css('width', data.stamina + '%');
        } else {
            $('#stamina-container').fadeOut('slow');
        }

        if (data.stress > 0) {
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

        if (data.talking) {
            $('#voice').css('background-color', 'rgba(240, 252, 25, 0.8)');
        } else {
            $('#voice').css('background-color', 'rgba(182, 182, 182, 0.641)');
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

    function setHudSizeLimits() {
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;

        var maxValues = {
            '1920x1080': { maxHeight: 853, maxWidth: 1615 },
            '2560x1440': { maxHeight: 1142, maxWidth: 2154 }
            // Add more resolutions here if needed
        };
        var defaultMaxHeight = 995;
        var defaultMaxWidth = 2000;
        var resolutionKey = screenWidth + 'x' + screenHeight;
        var maxHeight = maxValues[resolutionKey] ? maxValues[resolutionKey].maxHeight : defaultMaxHeight;
        var maxWidth = maxValues[resolutionKey] ? maxValues[resolutionKey].maxWidth : defaultMaxWidth;
        $('#vehicleHudHeight').attr('max', maxHeight);
        $('#vehicleHudWidth').attr('max', maxWidth);
    }

    $('.vehicleHudHeightReset').click(function() {
        $('#vehicleHudHeight').val($('#vehicleHudHeight').attr('value'));
    });

    $('.vehicleHudWidthReset').click(function() {
        $('#vehicleHudWidth').val($('#vehicleHudWidth').attr('value'));
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

    function display(bool) {
        if (bool) {
            $('#ui-container').show();
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
            $.post('https://qbx_hud/exit', JSON.stringify({}));
            return
        }
    };

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
        if (playerHudContainer.style.display === 'block') {
            playerHudContainer.style.display = 'flex';
        } else {
            playerHudContainer.style.display = 'block';
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
        console.log('Height Value:', heightValue);
        $('#vehicle-hud-container').css('bottom', heightValue + 'px');
    
        $.post('http://qbx_hud/updateMinimapPosition', {
            height: heightValue
        });
    });

    $('.vehicleHudHeightReset').click(function() {
        $('#vehicleHudHeight').val(45);
        $('#vehicle-hud-container').css('bottom', '45px');
        updateSliderLabel('vehicleHudHeight', 45);
    });

    $('#vehicleHudWidth').on('input', function() {
        var widthValue = $(this).val();
        console.log('Height Value:', widthValue);
        $('#vehicle-hud-container').css('left', widthValue + 'px');
        $.post('http://qbx_hud/updateMinimapPosition', {
            width: widthValue
        });
    });

    $('.vehicleHudWidthReset').click(function() {
        $('#vehicleHudWidth').val(12);
        $('#vehicle-hud-container').css('left', '12px');
        updateSliderLabel('vehicleHudWidth', 12);
    });

    $('.add-new').click(function() {
        var $select = $('#hudVersion');
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

    $('#vehicleHudHeight, #UIElementGap, #vehicleHudWidth').each(function() {
        var $this = $(this);
        var value = $this.val();
        var sliderId = $this.attr('id');
        updateSliderLabel(sliderId, value);
    });

    $('#vehicleHudHeight, #UIElementGap, #vehicleHudWidth').on('input', function() {
        var $this = $(this);
        var value = $this.val();
        var sliderId = $this.attr('id');
        updateSliderLabel(sliderId, value);
    });

    $(window).resize(function() {
        $('#vehicleHudHeight, #UIElementGap, #vehicleHudWidth').each(function() {
            var $this = $(this);
            var value = $this.val();
            var sliderId = $this.attr('id');
            updateSliderLabel(sliderId, value);
        });
    });

    setHudSizeLimits();
    //previewUpdateHUD();
});
