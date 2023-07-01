AFRAME.registerComponent("stereo-beat", {
  schema: {
    eye: { type: "string", default: "left", oneOf: ["left", "right", "both"] },
  },
  eyeToLayer: {
    both: 0,
    left: 1,
    right: 2,
  },

  update: function (oldData) {
    this.el.object3D.children[0].layers.set(this.eyeToLayer[this.data.eye]);
  },
});
