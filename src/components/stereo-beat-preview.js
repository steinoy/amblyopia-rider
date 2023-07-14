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
        let leftMesh = this.el.object3DMap.mesh;
        let rightMesh = this.el.object3DMap.mesh.clone();
        
        leftMesh.material = materials.left[this.data.color];
        leftMesh.layers.set(1);
        
        rightMesh.material = materials.right[this.data.color];
        rightMesh.layers.set(2);
        
        leftMesh.position.set(0.1, 0, 0);

        this.el.object3D.add(rightMesh);
      }
    );
  },
});
