var rocket;
var population;
var lifespan = 200;
var lifeP;
var count = 0;
var target;

function setup() {
	createCanvas(700, 400);
	rocket = new Rocket();
	population = new Population();
	lifeP = createP();
	target = createVector(width/4, 100);
}

function mousePressed(){
	var t = createVector(mouseX, mouseY);
	target = t;
	population = new Population();
}

function draw() {
	background(0);
	population.run();
	lifeP.html(count);
	count++;

	if (count == lifespan){
		count = 0;
		population.evaluate();
		population.selection();
	}

	ellipse(target.x, target.y, 16, 16);
}

function Population() {
	this.rockets = [];
	this.popsize = 100;
	this.matingPool = [];

	for (var i = 0; i < this.popsize; i++) {
		this.rockets[i] = new Rocket();
	}

	this.evaluate = function(){
		var maxfit = 0;
		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].calcFitness();
			if(this.rockets[i].fitness > maxfit){
				maxfit = this.rockets[i].fitness;
			}
		}

		for (var i = 0; i < this.popsize; i++) {
			this.rockets[i].fitness /= maxfit;

		}

		this.matingPool = [];
		for (var i = 0; i < this.popsize; i++) {
			var n = this.rockets[i].fitness * 100;
			for (var j = 0; j < n; j++){
				this.matingPool.push(this.rockets[i]);
			}
		}
	}
	this.selection = function(){
		var newRockets = [];
		for (var i = 0; i < this.rockets.length; i++) {
			var parentA = random(this.matingPool).dna;
			var parentB = random(this.matingPool).dna;
			var child = parentA.crossover(parentB);

			newRockets[i] = new Rocket(child);
		}
		this.rockets = newRockets;
	}

	this.run = function(){
		for (var i = 0; i < this.popsize; i++){
			this.rockets[i].update();
			this.rockets[i].show();
		}

	}

}

function DNA(genes){
	if(genes) {
		this.genes = genes;
	} else {
		this.genes = [];

		for (var i = 0; i < lifespan; i++){
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(0.5);
		}
	}

	this.crossover = function(partner) {
		var newgenes = [];
		var mid = floor(random(this.genes.length));

		for(var i = 0; i < this.genes.length; i++){
			if (i > mid){
				newgenes[i] = this.genes[i];
			} else {
				newgenes[i] = partner.genes[i];
				console.log(mid);
			}
		}
		return new DNA(newgenes);

	}

}


function Rocket(dna){
	this.pos = createVector(width/2, height);
	this.vel = createVector();
	this.acc = createVector();
	this.completed = false;
	this.colourR = random(255);
	this.colourG = random(255);
	this.colourB = random(255);
	if (dna) {
		this.dna = dna;
	}else{
		this.dna = new DNA();

	}
	this.fitness = 0;

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if (d < 10) {
			this.completed = true;
			this.pos = target.copy();
		}
		this.applyForce(this.dna.genes[count]);
		if (!this.completed) {
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
	}

	this.calcFitness = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);
		if (this.completed){
			this.fitness *=15;
		}
	}

	this.show = function(){
		push();
		noStroke();
		fill(this.colourR, this.colourG, this.colourB,100);
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		rect(0, 0, 25, 5);
		pop();
	}
}
