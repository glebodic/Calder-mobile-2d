// Author: Gwenaël Le Bodic
// P5.js experiments with random generation of Calder mobile inspired structure

const max_v_length = 150 ; // max length of the vertical support
const min_v_length = 50 ;  // min length of the vertical support
const max_h_length = 300 ; // max length of the horizontal support
const min_h_length = 200 ; // min length of the horizontal support

const max_generations = 10 ;

class Node {
  constructor(generation=0,x=0,y=0, is_leaf=false, weight=0, leaf_color=0) {
    this.generation=generation ;
    
    if (generation==0) {
      // This is the original node on the top
      this.x=width/2;
      this.y=50;      
      this.leaf = false ;
    }
    else {
      this.x = x ;
      this.y = y ;  
      if (is_leaf == true) {
        // This has to be a terminal leaf
        this.leaf=true ;
      }
      else {
        // Let's decide randomly whether this should be a terminal leaf or a node with child nodes
        this.leaf = (random(1)>.75) ;
      }
    }

    this.weight = weight ;
    this.leaf_color = leaf_color ;


    if (this.leaf == false) {
      // This is not a terminal leaf
      this.v_length = random(min_v_length, max_v_length) / (generation+1) ;

      this.h_length = random(min_h_length, max_h_length) / (generation+1) ;
      this.p = random(0.3,0.7) ; // where is the horizontal support connected to the top vertical support, e.g. 30% on the left. 50% would be in the middle
      this.a = random(-30,30) ; // the angle of the horizonal support. 0 would be perfectly horizonal. 30 degress would be leaning on left.

      this.left_leave_length = random(min_v_length, max_v_length) ;
      this.right_leave_length = random(min_v_length, max_v_length) ;

      this.h_x1 = this.x - cos(this.a)*this.h_length*this.p ;
      this.h_x2 = this.h_x1 + cos(this.a)*this.h_length ;
      
      this.h_y1 = this.y+this.v_length+sin(this.a)*this.h_length*this.p ;
      this.h_y2 = this.y+this.v_length-sin(this.a)*this.h_length*(1-this.p) ;
      
      let scale = 2 ;

      if (generation <= max_generations) {
        this.left_node = new Node(generation+1,this.h_x1,this.h_y1, false, scale * weight*(1-this.p) * map(this.a, -30, 30, 0.4, 0.6),leaf_color) ;
        this.right_node = new Node(generation+1,this.h_x2,this.h_y2, false, scale * weight*this.p * (1-map(this.a, -30, 30, 0.4, 0.6)),leaf_color) ;
      }
      else {
        // After a number of generations, let's force nodes to be terminal leaves
        this.left_node = new Node(generation+1,this.h_x1,this.h_y1, true, scale * weight*(1-this.p)*map(this.a, -30, 30, 0.4, 0.6),leaf_color) ;
        this.right_node = new Node(generation+1,this.h_x2,this.h_y2, true, scale * weight*this.p * (1-map(this.a, -30, 30, 0.4, 0.6)),leaf_color) ;
      }
    }
  }

  show() {
    if (this.generation == 0) {
      // build a base (black triangle)
      fill(0,0,0)
      beginShape() ;
      vertex(this.x,this.y) ;
      vertex(this.x-15,this.y-40) ;
      vertex(this.x+15,this.y-40) ;
      endShape(CLOSE);

    }

    if (this.leaf == false) {
      // this is not a terminal leaf
      line(this.x,this.y,this.x,this.y+this.v_length) ; // vertical line
      line(this.h_x1, this.h_y1,this.h_x2, this.h_y2) ; // horizontal line
      fill(0,0,0)
      circle(this.x,this.y+this.v_length,4);
      this.left_node.show() ;
      this.right_node.show() ;
    }
    else {
      // This is a terminal leaf
      if (this.leaf_color == 0) {
        fill(255,0,0) ;
      }
      else {
        fill(255,255,0) ;
      }
      this.radius = map(this.weight,0,100,0,60) + 10;
      line(this.x, this.y, this.x, this.y +  this.radius ) ;
      circle(this.x, this.y+this.radius ,this.radius) ;
    }
  }
}
 
let node, node2 ;

function setup() {
  createCanvas(1000, 600);
  angleMode(DEGREES) ;
  node = new Node(0,0,0,false,100,0)
  node2 = new Node(0,0,0,false,100,1)
}

function draw() {
  background(255);
  stroke(0)
  
  node.show(); // Show the first node, other will show recursively
  node2.show();
}