class Player {

  constructor(mineData, name, deathCallback) {
    this.functionToCallWhenIDie = deathCallback;
    this.name = name;
    this.points = 0;
    this.mineData = mineData;
    this.mineCart = {};
    this.emptyMineCart();
    this.dead = false;

    this.domElements = {
      container: null,
      name: null,
      score: null,
      mineCart: null
    }
  }

  emptyMineCart(){
    for (var gem in this.mineData) {
      this.mineCart[gem] = 0;
    }
  }

  addGem(gem) {


    //if statement for men selected /obsidian
    this.mineCart[gem]++;
    this.points += this.mineData[gem].value;

    if (this.mineCart.obsidian === 2) {
      this.die();
    }
    this.updatePlayer();
  }




  //Sam added die fuction to 'players.js' from the 'gameboard.js'
  die() {
    this.dead = true;
    this.grungeUpPlayer();
    this.points = 0;
    $("#popUpSleepy2").removeClass("hidden");
    this.functionToCallWhenIDie( this );
  }
  grungeUpPlayer(){
    this.domElements.container.addClass('kaboom');
  }
  updatePlayer(){
    this.domElements.score.text(this.points);
    for( var gem in this.mineCart){
      this.domElements.mineCart.find('.'+gem).text( this.mineCart[gem]);
    }
  }
  markActive(){
    this.domElements.container.addClass('currentPlayer');
  }
  markInactive(){
    this.domElements.container.removeClass('currentPlayer');
  }
/*
  <div class="player">
                <div class="shadow">
                    <div class="player_name">
                        <h2></h2>
                    </div>
                    <div class="score">
                        <span class="score_text">32</span>
                    </div>
                    <div class="gem_div">
                        <div class="gem topaz" >1</div>
                        <div class="gem emerald" ></div>
                        <div class="gem ruby" >1</div>
                        <div class="gem diamond" >1</div>
                        <div class="gem obsidian" >1</div>
                        <div class="pop-up hidden" >You died!</div>
                    </div>
                </div>
            </div>
  */

  render(){
    var domClone = $("#templates > .player").clone();
    this.domElements = {
      container: domClone,
      name: domClone.find('.player_name > h2'),
      score: domClone.find('.score_text'),
      mineCart: domClone.find('.gem_div')
    }
    this.domElements.name.text(this.name);
    this.updatePlayer();
    return this.domElements.container;
  }

  moveGemtoCart(gem){
    var mineGem = $('.mine .hidden .'+ gem);
    mineGem.css('position', 'absolute');
    var playerGemPosition = this.domElements.mineCart.find('.' + gem).offset();
    console.log(playerGemPosition);
    mineGem.removeClass('hidden');
    mineGem.animate({
      top: playerGemPosition.top + 'px',
      left: playerGemPosition.left +'px'
    }, 3000);
  }

}
