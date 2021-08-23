function gotoSellers(){
    //redicrect from bossHome page to sellersHome page
    window.location.href = "/sellers/sellersHome";
};

function gotoInventory(){
    //redicrect from bossHome page to inventoryHome page
    window.location.href = "/inventory/inventoryHome";
};

function showOrHideProfit(){
    let div = $("#profitShowOrHide").get(0);
    if(div.style.display == ""){
        div.style.display = "none";
    }else{
        div.style.display = "";
    }
}