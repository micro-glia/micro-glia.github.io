document.getElementById('toggleSwitch').addEventListener('change', function(event) {
    if (event.target.checked) {
        document.body.style.backgroundColor = '#f0f0f5';
        document.body.style.color = '#1c1c1e';
    } else {
        document.body.style.backgroundColor = '#1c1c1e';
        document.body.style.color = '#f0f0f5';
    }
});
