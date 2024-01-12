$(document).ready(function(){
	
	document.getElementById("current-year").innerHTML = new Date().getFullYear();

	// Mobile Navigation Bar
	const menu_btn = document.getElementById('menu-icon');
	const nav = document.querySelector('nav');

	menu_btn.onclick = function() {
		menu_btn.classList.toggle('is_active');
		nav.classList.toggle('is_active');	
	};

	document.onclick = function(e) {
		if (e.target.id !== 'menu-icon' && e.target.id !== 'nav_area'){
			menu_btn.classList.remove('is_active');
			nav.classList.remove('is_active');
		}
	};
	// End of Mobile Navigation Bar


	// Progress Bar Animation
	const skillsSection = document.getElementById('my-skills');
	const progressBars = document.querySelectorAll('.progress-bar');

	function showProgress() {
		progressBars.forEach(progressBar=> {
			const value = progressBar.dataset.progress;

			progressBar.style.opacity = 1;
			progressBar.style.width = `${value}%`;
		});
	}
	
	function hideProgress() {
		progressBars.forEach(p => {
			p.style.opacity = 0;
			p.style.width = 0;
		});
	}

	window.addEventListener('scroll',() => {
		const sectionPos = skillsSection.getBoundingClientRect().top;
		const screenPos = window.innerHeight / 2;

		if(sectionPos < screenPos){
			showProgress();
		} else {
			hideProgress();
		}
	})
	// End of Progress Bar Animation

	// Navigation Active && Animation
	let sections = document.querySelectorAll('section');
	let navLinks = document.querySelectorAll('nav ul li a');

	window.onscroll = () => {
		sections.forEach(sec => {
			let top = window.scrollY;
			let offset = sec.offsetTop - 150;
			let height = sec.offsetHeight;
			let id = sec.getAttribute('id');

			if (top >= offset && top < offset + height) {
				navLinks.forEach(links => {
					links.classList.remove('active');
					document.querySelector('nav ul li a[href*=' + id + ']').classList.add('active');
				});
			}

			if (top >= offset && top < offset + height){
				sec.classList.add('show-animate');
			}
			//repeating animation
			// else {
			// 	sec.classList.remove('show-animate');
			// }
		});
	};
	// End of Navigation Active && Animation

	// Accordion
	$(".exp-year").click(function () {
        if ($('.exp-details').is(':visible')) {
            $(".exp-details").slideUp(300);
            $(".plusminus").text('+');
        }
        if ($(this).next(".exp-details").is(':visible')) {
            $(this).next(".exp-details").slideUp(300);
            $(this).children(".plusminus").text('+');
        } else {
            $(this).next(".exp-details").slideDown(300);
            $(this).children(".plusminus").text('-');
        }
    });
	// End of Accordion

	// Portfolio Carousel
	$(".rslides").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
		arrows: false,
		responsive: [
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
				breakpoint: 600,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  autoplay: true,
  				  autoplaySpeed: 5000,
				}
			  }
		]
    });
	// End of Portfolio Carousel

	// contact form
	const form = document.querySelector("form");
	const name = document.getElementById("name");
	const email = document.getElementById("email");
	const phone = document.getElementById("phone");
	const subject = document.getElementById("subject");
	const message = document.getElementById("message");

	function checkEmail() {
		const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		const errorTxtEmail = document.querySelector(".error-txt.email");

		if (!email.value.match(emailRegex)) {
			email.classList.add("error");
			email.parentElement.classList.add("error");

			if (email.value	!= "") {
				errorTxtEmail.innerText = "Enter a valid email address";
			} else {
				errorTxtEmail.innerText = "Email Address can't be blank";
			}

		} else {
			email.classList.remove("error");
			email.parentElement.classList.remove("error");
		}
	}

	function sendEmail() {
	const bodyMessage = `Name: ${name.value}<br> Email: ${email.value}<br> Phone: ${phone.value}<br> Subject: ${subject.value}<br> Message: ${message.value}`;

		Email.send({
			Host : "smtp.elasticemail.com",
			Username : "joelmayol0895@gmail.com",
			Password : "AA5AAF87D944ED2B9D55723A26ED34A63404",
			To : 'joelmayol0895@gmail.com',
			From : "joelmayol0895@gmail.com",
			Subject : subject.value,
			Body : bodyMessage
		}).then(
		  message => {
			if (message == "OK"){
				Swal.fire({
					title: "Sent!",
					text: "Thank you for sending a message!",
					icon: "success"
				  });
			}
		  }
		);
	}

	function checkInputs() {
		const items = document.querySelectorAll(".item");

		for (const item of items) {
			if (item.value == "") {
				item.classList.add("error");
				item.parentElement.classList.add("error");
			}

			if (items[1].value != "") {
				checkEmail();
			}

			items[1].addEventListener("keyup", () => {
				checkEmail();
			});

			item.addEventListener("keyup", () => {
				if (item.value != "") {
					item.classList.remove("error");
					item.parentElement.classList.remove("error");
				} else {
					item.classList.add("error");
				item.parentElement.classList.add("error");
				}
			});
		}
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		checkInputs();
		
		if(!name.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")){
			sendEmail();

			form.reset();
			return false;
		}
	})

	// end of contact form

	// back to top
	var webHeight = $(document).height();

	$('.back_top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 900);
		return false;
	});
	// end of back to top

	$(window).scroll(function(){  // fade in fade out button
	var windowScroll = $(this).scrollTop();

		if (windowScroll > (webHeight * 0.5) ) {
			$(".back_top").fadeIn();
		} else{
			$(".back_top").fadeOut()
		};

	});

});
