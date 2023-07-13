import { MODELS, setObjModelFromTemplate } from "./beat.js";

AFRAME.registerComponent("stereo-beat-preview", {
  schema: {
    color: { default: "red", oneOf: ["red", "blue"] },
    type: { default: "arrow", oneOf: ["arrow", "dot", "mine"] },
  },

  init: function () {
    setObjModelFromTemplate(
      this.el,
      MODELS[this.data.type !== "mine" ? `${this.data.type}${this.data.color}` : this.data.type],
      () => {
        let materials = this.el.sceneEl.systems.materials.stereoBeat;
        
        this.el.object3DMap.mesh.material = materials.left[this.data.color];
        this.el.object3DMap.mesh.layers.set(1);

        let rightMesh = this.el.object3DMap.mesh.clone();
        rightMesh.material = materials.right[this.data.color];
        rightMesh.layers.set(2);
        this.el.object3D.add(rightMesh);
      }
    );
  },
});
