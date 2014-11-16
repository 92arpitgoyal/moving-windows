  //Moving Option Dialogs in Whole canvas
  function MovingWindow(options) {
      this.container_ = $(options.container);
      this.movingEl_ = $(options.movingEl);
      this.handel_ = $(options.handel);
      
      this.setDimensions();
      this.setEvents();
  }

  MovingWindow.zIndex = 99;

  MovingWindow.prototype.containerDimensions = {
      'width': 0,
      'height': 0,
      'left': 0,
      'top': 0
  };

  MovingWindow.prototype.setZindex = function () {
      this.movingEl_.css("z-index", ++MovingWindow.zIndex);
  };

  MovingWindow.prototype.setDimensions = function () {
      this.containerDimensions = {
          'width': this.container_.width(),
          'height': this.container_.height(),
          'top': this.container_.position().top,
          'left': this.container_.position().left
      };
  };

  MovingWindow.prototype.setEvents = function () {
      var self = this,
          box_offset,
          offset_x, offset_y;

      this.handel_.on("mousedown", function (ev) {
          ev.stopPropagation();
          
          box_offset = self.movingEl_.position(),
          offset_x = ev.clientX - box_offset.left,
          offset_y = ev.clientY - box_offset.top;

          // Bring to front
          self.setZindex();

          $(window).on("mouseup", function () {
              self.container_.off("mousemove");
          });

          self.container_.on("mousemove", function (evt) {
              evt.stopPropagation();

              if(evt.clientX < self.containerDimensions.left 
                || evt.clientX > self.containerDimensions.width + self.containerDimensions.left) {
             //condition for box not to cross vertically
                  if(evt.clientY>self.containerDimensions.top && evt.clientY<self.containerDimensions.top+self.containerDimensions.height){self.movingEl_.css("top", evt.clientY - offset_y);
                                                               return;}
              }
              
              if(evt.clientY < self.containerDimensions.top 
                || evt.clientY > self.containerDimensions.height + self.containerDimensions.top) {
              //condition for box not to cross horizontally
                 if(evt.clientX>self.containerDimensions.left && evt.clientX<self.containerDimensions.left+self.containerDimensions.width)
                 {                self.movingEl_.css("left", evt.clientX - offset_x);
                  return;}
              }
              
              if (evt.clientX > self.containerDimensions.width + self.containerDimensions.left 
                  || evt.clientX < self.containerDimensions.left
                  || evt.clientY > self.containerDimensions.height + self.containerDimensions.top
                  || evt.clientY < self.containerDimensions.top) return;

              self.movingEl_.css("left", evt.clientX - offset_x);
              self.movingEl_.css("top", evt.clientY - offset_y);
          });
      });
  };

  new MovingWindow({'container': ".container", 'movingEl': ".box1", 'handel': '.box1 .head'});

  new MovingWindow({'container': ".container", 'movingEl': ".box2", 'handel': '.box2 .head'});

  new MovingWindow({'container': ".container", 'movingEl': ".box3", 'handel': '.box3 .head'});
