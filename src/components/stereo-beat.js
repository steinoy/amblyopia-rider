AFRAME.registerComponent("stereo-beat", {
  init() {
    this.el.addEventListener("loaded", () => {
      // replace the original mesh with new ones, one for each eye
      this.leftMesh = this.el.children[0].object3D.children[0].clone();
      this.rightMesh = this.el.children[0].object3D.children[0].clone();
      this.el.children[0].object3D.add(this.leftMesh);
      this.el.children[0].object3D.add(this.rightMesh);

      // hide original
      this.el.children[0].object3D.children[0].visible = false;

      // left VR camera is by default enabled for layer 0 and 1,
      // right camera for layer 0 and 2

      // cameras can only see objects that share at least one common layer with the camera
      // show the left mesh to the left camera only (layer 1)
      this.leftMesh.layers.set(1);
      this.leftMesh.position.set(0.2, 0.05, 0);

      // show the right mesh to the right camera only (layer 2)
      this.rightMesh.layers.set(2);

      let materials = this.el.sceneEl.systems.materials.stereoBeat;

      this.leftMesh.material =
        this.el.getAttribute("beat").color == "red"
          ? materials.left.red
          : materials.left.blue;

      this.rightMesh.material =
        this.el.getAttribute("beat").color == "red"
          ? materials.right.red
          : materials.right.blue;
    });
  },
});
