AFRAME.registerComponent('percentage-slider', {
    schema: {
        name: {type: 'string'},
        value: {type: 'number', default: 0.5},
        handleBarColor: {type: 'string', default: '#ffffff'},
        handleColor: {type: 'string', default: '#000000'},
        active: {type: 'boolean', default: false}
    },
    init: function() {
        let cameraEl = document.querySelector('#camera');
        this.globalState = this.el.sceneEl.systems.state;
        this.sliderWidth = 1;

        this.el.setAttribute('geometry', `primitive: box; width: ${this.sliderWidth}; height: 0.15; depth: 0.00001;`);
        this.el.setAttribute('material', `shader: flat; opacity: 0;`);
        this.el.setAttribute('position', `0 0 0`);

        this.sliderBar = document.createElement("a-entity");
        this.sliderBar.setAttribute('geometry', `primitive: box; width: ${this.sliderWidth}; height: 0.01; depth: 0.03;`);
        this.sliderBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.handleBarColor};`);
        this.sliderBar.setAttribute('position', `0 0 -0.02`);
        this.el.appendChild(this.sliderBar);

        this.handle = document.createElement("a-entity");
        this.handleStartPos = this.sliderWidth * -0.5;
        this.handle.setAttribute('id', 'slider-handle');
        this.handle.setAttribute('geometry', `primitive: sphere; radius: 0.08;`);
        this.handle.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.handleColor};`);
        this.handle.setAttribute('position', `${this.handleStartPos + this.sliderWidth * this.data.value} 0 0`);
        this.handle.setAttribute('mixin', 'clickSoundUI hoverSoundUI');
        this.handle.setAttribute('animation__mouseenter', 'property: scale; to: 1.2 1.2 1.2; dur: 150; easing: easeInOutCubic; startEvents: mouseenter');
        this.handle.setAttribute('animation__mouseleave', 'property: scale; to: 1 1 1; dur: 125; easing: easeInOutCubic; startEvents: mouseleave');
        this.el.appendChild(this.handle);

        this.dragging = false;

        this.handle.addEventListener('mousedown', (evt) => {
            cameraEl.setAttribute('look-controls', 'enabled', false);
            this.dragging = true;
        });

        this.raycasterEl = null;

        this.el.addEventListener('raycaster-intersected', (evt) => {
            this.raycasterEl = evt.detail.el;
        });

        this.handle.addEventListener('mouseup', (evt) => {
            cameraEl.setAttribute('look-controls', 'enabled', true);
            console.log('mouseup');
            this.dragging = false;
        });
    },
    update: function(oldData) {
        if(oldData.value !== this.data.value) {
            this.handle.setAttribute('position', `${this.handleStartPos + this.sliderWidth * this.data.value} 0 0`);
        }

        if(oldData.handleColor !== this.data.handleColor) {
            this.handle.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.handleColor};`);
        }

        if(oldData.handleBarColor !== this.data.handleBarColor) {
            this.sliderBar.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.handleBarColor};`);
        }

        if(this.data.active && !oldData.active) {
            this.el.setAttribute('raycastable');
            this.handle.setAttribute('raycastable');
        } else if(!this.data.active && oldData.active) {
            this.el.removeAttribute('raycastable');
            this.handle.removeAttribute('raycastable');
        }
    },
    tick() {
        if (!this.dragging || !this.raycasterEl) return;

        const intersection = this.raycasterEl.components.raycaster.getIntersection(this.el);

        if (!intersection) return;

        let localIntersectionPoint = this.el.object3D.worldToLocal(intersection.point);

        let sliderPos = (localIntersectionPoint.x + (this.sliderWidth * 0.5)) / this.sliderWidth;
        this.data.value = Math.max(0, Math.min(1, sliderPos));
        this.handle.setAttribute('position', `${this.handleStartPos + this.sliderWidth * this.data.value} 0 0`);

        this.el.emit('update', {value: this.data.value, name: this.data.name});
    }
});
