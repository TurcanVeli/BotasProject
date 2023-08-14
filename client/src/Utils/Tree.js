
export class TreeNode {
  constructor(value, parent) {
    
    this.value = value;
    this.name = value.cihazAdi;
    this.parent = parent;
    this.children = [];
    this.pingID = value.pingID;
    this.rootID = value.rootID;
    this.id = this.pingID + this.rootID
    //if children is empty then is is last tree
  }
}


