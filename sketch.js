// Author: Gwenaël Le Bodic



const max_v_length = 150 ;
const min_v_length = 50 ;
const max_h_length = 300 ;
const min_h_length = 200 ;
const min_radius = 20 ;
const max_radius = 40 ;

const max_generations = 3 ;

class Node {
  constructor(generation=0,x=0,y=0, is_leaf=false, weight=0) {
    this.generation=generation ;
    
    if (generation==0) {
      this.x=width/2;
      this.y=50;      
      this.leaf = false ;
    }
    else {
      this.x = x ;
      this.y = y ;  
      if (is_leaf == true) {
        this.leaf=true ;
      }
      else {
        this.leaf = (random(1)>.75) ;
      }
    }

    this.weight = weight ;


    if (this.leaf == false) {
      this.v_length = random(min_v_length, max_v_length) / (generation+1) ;

      this.h_length = random(min_h_length, max_h_length) / (generation+1) ;
      this.p = random(0.3,0.7) ;
      this.a = random(-30,30) ;

      this.left_leave_length = random(min_v_length, max_v_length) ;
      this.right_leave_length = random(min_v_length, max_v_length) ;
      this.radius = random (min_radius,max_radius)
  
  //    this.adj = cos(this.a)*this.h_length ;
  //    this.opp = sin(this.a)*this.h_length ;

      this.h_x1 = this.x - cos(this.a)*this.h_length*this.p ;
      this.h_x2 = this.h_x1 + cos(this.a)*this.h_length ;
      
      this.h_y1 = this.y+this.v_length+sin(this.a)*this.h_length*this.p ;
      this.h_y2 = this.y+this.v_length-sin(this.a)*this.h_length*(1-this.p) ;
      
let scale = 2 ;

      if (generation <= max_generations) {
        this.left_node = new Node(generation+1,this.h_x1,this.h_y1, false, scale * weight*(1-this.p) * map(this.a, -30, 30, 0.4, 0.6)) ;
        this.right_node = new Node(generation+1,this.h_x2,this.h_y2, false, scale * weight*this.p * (1-map(this.a, -30, 30, 0.4, 0.6))) ;
      }
      else {
        this.left_node = new Node(generation+1,this.h_x1,this.h_y1, true, scale * weight*(1-this.p)*map(this.a, -30, 30, 0.4, 0.6)) ;
        this.right_node = new Node(generation+1,this.h_x2,this.h_y2, true, scale * weight*this.p * (1-map(this.a, -30, 30, 0.4, 0.6))) ;
      }
    }
  }

  show() {
    if (this.generation == 0) {
      // show a base
      fill(0,0,0)
      beginShape() ;
      vertex(this.x,this.y) ;
      vertex(this.x-15,this.y-40) ;
      vertex(this.x+15,this.y-40) ;
      endShape(CLOSE);

    }

    if (this.leaf == false) {
      line(this.x,this.y,this.x,this.y+this.v_length) ; // vertical line
      line(this.h_x1, this.h_y1,this.h_x2, this.h_y2) ; // horizontal line
      fill(0,0,0)
      circle(this.x,this.y+this.v_length,5);
//      if (this.generation <= max_generations) {
        this.left_node.show() ;
        this.right_node.show() ;
//      }
    }
    else {
      // Draw the leaves
      fill(255,0,0)
      //line(this.h_x1, this.h_y1, this.h_x1, this.h_y1 + this.left_leave_length )
      //circle(this.h_x1, this.h_y1+ this.left_leave_length,this.radius)
      //line(this.h_x2, this.h_y2, this.h_x2, this.h_y2 +  this.right_leave_length )
      //circle(this.h_x2, this.h_y2+this.right_leave_length ,this.radius)
      this.radius = map(this.weight,0,100,0,60) + 10;
     // print(this.weight);
     // this.radius = 20 ;
      line(this.x, this.y, this.x, this.y +  this.radius )
      circle(this.x, this.y+this.radius ,this.radius)
    }
  }

  }
 
let node ;

function setup() {
  createCanvas(1000, 600);
  angleMode(DEGREES) ;
  node = new Node(0,0,0,false,100)
}

function draw() {
  background(255);
  stroke(0)
  
  // First vertical line
  node.show();
//  line(width/2,0,width/2,50)
}