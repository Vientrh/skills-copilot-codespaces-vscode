function skillsMember() {
    var member = document.getElementById('member');
    var memberSkills = document.getElementById('member-skills');
    var memberSkillsBtn = document.getElementById('member-skills-btn');
    var memberSkillsClose = document.getElementById('member-skills-close');

    memberSkillsBtn.addEventListener('click', function () {
        memberSkills.classList.add('active');
        member.classList.add('active');
    });

    memberSkillsClose.addEventListener('click', function () {
        memberSkills.classList.remove('active');
        member.classList.remove('active');
    });
}