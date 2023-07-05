AFRAME.registerComponent('stereo-preview', {
    schema: {
        red: {type: 'string', default: '#ff0000'},
        blue: {type: 'string', default: '#0000ff'},
        stereoRed: {type: 'number', default: 0.5},
        stereoBlue: {type: 'number', default: 0.5},
    },
    init() {
        this.leftRed = document.createElement("a-entity");
        this.leftRed.setAttribute('geometry', `primitive: box; width: 0.1; height: 0.1; depth: 0.03;`);
        this.leftRed.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.red};`);
        this.leftRed.setAttribute('position', `-0.4 0 -0.02`);
        this.el.appendChild(this.leftRed);

        this.leftBlue = document.createElement("a-entity");
        this.leftBlue.setAttribute('geometry', `primitive: box; width: 0.1; height: 0.1; depth: 0.03;`);
        this.leftBlue.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.blue};`);
        this.leftBlue.setAttribute('position', `-0.3 0 -0.02`);
        this.el.appendChild(this.leftBlue);

        this.rightRed = document.createElement("a-entity");
        this.rightRed.setAttribute('geometry', `primitive: box; width: 0.1; height: 0.1; depth: 0.03;`);
        this.rightRed.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.red};`);
        this.rightRed.setAttribute('position', `0.3 0 -0.02`);
        this.el.appendChild(this.rightRed);

        this.rightBlue = document.createElement("a-entity");
        this.rightBlue.setAttribute('geometry', `primitive: box; width: 0.1; height: 0.1; depth: 0.03;`);
        this.rightBlue.setAttribute('material', `shader: flat; opacity: 1; side:double; color: ${this.data.blue};`);
        this.rightBlue.setAttribute('position', `0.4 0 -0.02`);
        this.el.appendChild(this.rightBlue);
    },
    update() {
        let leftRedOpacity = this.data.stereoRed <= 0.5 ? 1 : 1 - (this.data.stereoRed - 0.5) * 2;
        let leftBlueOpacity = this.data.stereoBlue <= 0.5 ? 1 : 1 - (this.data.stereoBlue - 0.5) * 2;
        let rightRedOpacity = this.data.stereoRed <= 0.5 ? this.data.stereoRed * 2 : 1;
        let rightBlueOpacity = this.data.stereoBlue <= 0.5 ? this.data.stereoBlue * 2 : 1;

        this.leftRed.setAttribute('material', `color: ${this.data.red}; opacity: ${leftRedOpacity};`);
        this.leftBlue.setAttribute('material', `color: ${this.data.blue}; opacity: ${leftBlueOpacity};`);
        this.rightRed.setAttribute('material', `color: ${this.data.red}; opacity: ${rightRedOpacity};`);
        this.rightBlue.setAttribute('material', `color: ${this.data.blue}; opacity: ${rightBlueOpacity};`);
    }
});
