class Foo{

	// constructor.
	constructor(public p1:string="uryyyyyyyyyy"){
	}
	// public method
	public bar():void{
		console.log(this.p1)
	}
}

var foo1 = new Foo();
foo1.bar();

var foo2 = new Foo("oraoraoraora");
foo2.bar();


var foo3 = new Foo();
foo3.p1 = "doradoradoradora";
foo3.bar();
