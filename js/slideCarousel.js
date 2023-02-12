$.fn.slideCarousel = function(options) {
    var defaults = {
        animateSpeed: 600,
        flippedAmount: 1,
        autoScroll: false,
        infinite: false,
        advanceSpeed: 5000,
        resizable: false,
        arrows: true,
        visibleItems: 5
    };

    var options = $.extend(defaults, options);

    return $(this).each(function() {

        var $this = $(this);
        $this.wrap('<div class="slideCarousel" />');
        var slideCarousel = $this.parent(),
            leftControl,
            rightControl,
            bullets;
            var carouselHeight = 0;
            $this.currentPosition = 0;

            var cyclePause = false;

        $this.wrap('<div style="overflow: hidden;" />').addClass('carousel-items');

        var carouselElem =  $this,
            carouselWrapper = carouselElem.parent(),
            slides = carouselElem.children('div, li'),
            slidesNumder = slides.size(),
            slideWidth = slides.eq(0).outerWidth(true),
            carouselWidth = slideWidth * slidesNumder,
            visibleItems = options.visibleItems,
            scaleFactor = parseFloat(slideWidth / carouselWrapper.outerWidth(true));


            //slides.outerWidth(slideWidth)
        // slides.each(function() {
        //     var _slide = $(this),
        //         _slideHeight = _slide.height(),
        //         _slideWidth = _slide.width();
        //     if(_slideHeight > carouselWrapper.height()) {
        //         carouselWrapper.height(_slideHeight);
        //         carouselHeight = carouselWrapper.height();
        //     }
        // });

        //carouselElem.outerWidth(carouselWidth);

        function viewport() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window )) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
        }


        function update() {

                if (viewport().width < 1230) {
                    visibleItems = 4;
                } else if (viewport().width < 1400) {
                    visibleItems = 5;
                } else {
                    visibleItems = 6;
                }
            

           
            //slideWidth = Math.round(carouselWrapper.outerWidth(true)/visibleItems);
            //slides.outerWidth(slideWidth);



            //carouselWidth = slideWidth * slidesNumder;
            //carouselElem.outerWidth(carouselWidth);

            if (offset !== 0) {
                carouselElem.animate({
                    'marginLeft': 0
                }, options.animateSpeed);
                $this.currentPosition = 0;
                ready = true;

                hideControls(0);
            }
        }
        

        function hideControls (position) {
            if (position==0) {
                leftControl && leftControl.addClass('disabled');
            } else {
                leftControl && leftControl.removeClass('disabled');
            }

            if (position==Math.ceil(slidesNumder/options.flippedAmount) - visibleItems ) {

                rightControl && rightControl.addClass('disabled');
            } else {
                rightControl && rightControl.removeClass('disabled');
            }
        }
        hideControls(0);

        if (options.resizable) {
            update();
            $(window).resize(function() {
                update();
                
            });
        }

        function setActive(pos) {
            nav.removeClass('active');
            nav.eq(pos).addClass('active');
        }

        if (carouselWidth <= carouselWrapper.outerWidth(true)) { return }

        var nav;
    
        function addControls() {
            if (options.arrows) {
                var $navigation = $('<nav><a class="slideLeft" href="#">←</a><a class="slideRight" href="#">→</a></nav>').insertAfter(carouselWrapper);
                
                leftControl = $navigation.children('a.slideLeft').click(function() {
                    shift("left");
                    return false;
                });
                rightControl = $navigation.children('a.slideRight').click(function() {
                    shift("right");
                    return false;
                });

                hideControls(0);
            }
            if (options.bullets) {
                var $navigation = $('<nav></nav>').insertBefore(carouselWrapper);

                bullets = slideCarousel.find('nav');


                for (i=0; i<Math.ceil(slidesNumder/visibleItems); i++) {
                    
                    var liMarkup = $('<a href="#">'+ i +'</a>');
                    bullets.append(liMarkup);
                    liMarkup.data('index',i);
                    bullets.find('a').first().addClass('active');

                    liMarkup.click(function() {
                        shift($(this).data('index'));

                        return false;
                    });
                }
                nav = bullets.find('a');
            }
        }


        if (slidesNumder > visibleItems) {
            addControls();
        }

        $this.cycleFlag = true;

        var itemSum = slidesNumder,
            offset = 0,
            ready = true;

        function shift(direction) {

            var fa = options.flippedAmount;

            // //set to correct position
            // if(position == "next") {
            //     unlock();
            //     if(!ready) { lock(); } else {
                    
            //         position = pos + 1;
            //         pos++;
                    
            //         if (position == slidesNumber) {
            //             position = 0;
            //             pos = 0;
            //         }


                    
            //     }
            // } else if(position == "prev") {
            //     unlock();
            //     if(!initFirstSlide(activeSlide) || !ready) { lock();} else {
            //         position = pos - 1;
            //         pos--;
            //     }
            // }


            if (options.infinite) {

                if (direction == "left") {
                    $this.currentPosition--;

                    slides = carouselElem.children('div, li');

                    slides.first().before(slides.last());
                    carouselElem.css('marginLeft', -slideWidth*fa);

                    offset = parseInt(carouselElem.css('marginLeft')) + slideWidth;

                    carouselElem.animate({
                        'marginLeft' : offset
                    }, options.animateSpeed, function() {ready = true});
                }
                if (direction == "right") {


                    slides = carouselElem.children('div, li');


                    $this.currentPosition++;


                    offset = parseInt(carouselElem.css('marginLeft')) - slideWidth;

                    carouselElem.animate({
                        'marginLeft' : offset
                    }, options.animateSpeed, function() {
                        ready = true;

                        slides.last().after(slides.first());
                        carouselElem.css('marginLeft', offset +slideWidth*fa);

                    //}
                    });

                    setActive($this.currentPosition);

                }
                return;
            }

            if (direction == "left" && $this.currentPosition!==0) {

                $this.currentPosition--;
                hideControls($this.currentPosition);
                if ((slidesNumder - itemSum)  <= options.flippedAmount) {
                    offset = 0;
                    $this.cycleFlag = true;
                }
                else {
                    offset += (options.flippedAmount * 100 / visibleItems);
                }
                carouselElem.stop(true, true).animate({
                'marginLeft' : offset + '%'
                }, options.animateSpeed, function() {ready = true;});
                itemSum = itemSum + options.flippedAmount;


            } else if (direction == "right" && (slidesNumder - visibleItems - options.flippedAmount*$this.currentPosition) !== 0) {

                itemSum = itemSum - options.flippedAmount;
                $this.currentPosition++;

                hideControls($this.currentPosition);

                if (itemSum  > options.flippedAmount) {
                    offset = options.flippedAmount * 100 / visibleItems *(-$this.currentPosition);
                } else {
                    offset = -(carouselWidth - slideWidth*options.flippedAmount);
                    $this.cycleFlag = false;
                }
                carouselElem.stop(true, true).animate({
                    'marginLeft' : offset + '%'
                }, options.animateSpeed, function() {ready = true;});


            } else if (typeof direction == 'number') {

                if (visibleItems === 1) { slideWidth = 100;}

                slideCarousel.find('.carousel-tabs li');
                offset = (slideWidth * direction) ;
                carouselElem.stop(true, true).animate({
                    'marginLeft': - offset + '%'
                    }, options.animateSpeed, 'easeInOutQuart', function() {
                        ready = true;
                    });

                $this.currentPosition = direction;

                setActive($this.currentPosition);

                if ($this.currentPosition==0) {
                    $this.cycleFlag = true;
                }
                if ((slidesNumder - visibleItems - options.flippedAmount*$this.currentPosition)==0) {
                    $this.cycleFlag = false;
                }
            }
        }


        if (options.autoScroll && !cyclePause) {
            var cycleTimer;

            function startCycle() {
                cycleTimer = setInterval(function() {
                    if ($this.cycleFlag) { shift($this.currentPosition+1); }
                        else { shift($this.currentPosition-1); }
                }, options.advanceSpeed);
            }
            function stopCycle() {
                clearInterval(cycleTimer);
            }

            startCycle();

            carouselWrapper.add(leftControl).add(rightControl).add(bullets).hover(function() {
                stopCycle();
                cyclePause = true;
            }, function() {
                cyclePause = false;
                startCycle();
            });

        }
    });
};