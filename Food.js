class Food{
    constructor(){
        this.foodsStock=0;
        this.lastFed;
        this.image=loadImage('milk.png');

    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;
        
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    getfedTime(lastFed)
    {
        this.lastFed=lastFed;
    }

    bedroom(){
        background(bedImg)
    }
    washroom(){
        background(wImg)
    }
    garden(){
        background(garImg)
    }

    display(){

        var x=80,y=300;

        imageMode(CENTER);

        if(this.foodStock!=0){
            for (var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
            image(this.image,x,y,50,50);
            x=x+30;
            }
        }
    }
}

