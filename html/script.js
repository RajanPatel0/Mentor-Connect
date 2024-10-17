// Filter Mentors Based on User Input
document.querySelector('.filter-button').addEventListener('click', function() {
   let industry = document.getElementById('industry').value;
   let experience = document.getElementById('experience').value;
   let location = document.getElementById('location').value.toLowerCase();
   let language = document.getElementById('language').value;

   let mentorCards = document.querySelectorAll('.mentor-card');

   mentorCards.forEach(card => {
       let mentorProfession = card.querySelector('.mentor-profession').textContent.toLowerCase();
       let mentorBio = card.querySelector('.mentor-bio').textContent.toLowerCase();

       if ((industry === 'all' || mentorProfession.includes(industry)) &&
           (experience === 'all' || mentorBio.includes(experience)) &&
           (location === '' || mentorBio.includes(location)) &&
           (language === 'all' || mentorBio.includes(language))) {
           card.style.display = 'block';
       } else {
           card.style.display = 'none';
       }
   });
});



// Social Media Icon Hover Effect
document.querySelectorAll('.social-icon').forEach(icon => {
   icon.addEventListener('mouseenter', () => {
       icon.style.transform = 'scale(1.2)';
   });
   icon.addEventListener('mouseleave', () => {
       icon.style.transform = 'scale(1)';
   });
});
