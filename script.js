$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.top').addClass("sticky");
        }else{
            $('.top').removeClass("sticky")
        }
        if(this.scrollY > 500){
            $('.scrollup').addClass("show")
        }else{
            $('.scrollup').removeClass("show")
        }
    })
});

$('.scrollup').click(function(){
    $('html').animate({scrollTop: 0});
});

$('.navlist-btn').click(function(){
    $('.navlist').toggleClass("active");
    $('.navlist-btn i').toggleClass("active");
});

var typed = new Typed(".input", {
    strings:["Desenvolvedor.","Analista de Sistemas.","DBA.","Web Design.","UI/UX Design.","Design Gráfico.","Youtuber.","Streamer.","Freelancer."],
    typeSpeed: 60,
    backSpeed: 60,
    loop:true
});

var typed = new Typed(".input2", {
    strings:["Victor Hugo.","Desenvolvedor.","Analista de Sistemas.","DBA.","Web Design.","UI/UX Design.","Design Gráfico.","Youtuber.","Streamer.","Freelancer."],
    typeSpeed: 60,
    backSpeed: 60,
    loop:true
});