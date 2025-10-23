// CORRECTED JAVASCRIPT
// Progress & sticky header
const hdr = document.getElementById('hdr');
const progress = document.getElementById('progress');
const onScroll = () => {
  const max = document.body.scrollHeight - window.innerHeight;
  const w = Math.max(0, (window.scrollY / max) * 100);
  progress.style.width = w + '%';
  if (window.scrollY > 30) {
    hdr.classList.add('scrolled');
    document.querySelector('.topbar').style.padding = '12px 0';
  } else {
    hdr.classList.remove('scrolled');
    document.querySelector('.topbar').style.padding = '20px 0';
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal-on-scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ 
    if(e.isIntersecting) { 
      e.target.classList.add('in'); 
      io.unobserve(e.target); 
    } 
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  mobileNav.classList.toggle('active');
  this.setAttribute('aria-expanded', this.classList.contains('active'));
  
  // Toggle body scroll
  document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Initialize interactive map
document.addEventListener('DOMContentLoaded', function() {
  const map = L.map('global-map').setView([25, 45], 2);
  
  // Add a professional tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);
  
  // Define our locations with coordinates
  const locations = [
    { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
    { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
    { name: "London, UK", lat: 51.5074, lng: -0.1278 },
    { name: "Rome, Italy", lat: 41.9028, lng: 12.4964 },
    { name: "Hyderabad, India", lat: 17.3850, lng: 78.4867 },
    { name: "Delhi, India", lat: 28.6139, lng: 77.2090 }
  ];
  
  // Custom icon for markers
  const customIcon = L.divIcon({
    html: '<i class="fas fa-map-marker-alt" style="color: #0D1B2A; font-size: 20px;"></i>',
    iconSize: [20, 20],
    className: 'custom-marker'
  });
  
  // Add markers for each location
  locations.forEach(location => {
    L.marker([location.lat, location.lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(`<b>${location.name}</b><br>Alatree Ventures Presence`);
  });
  
  // Fit map to show all markers
  const group = new L.featureGroup(locations.map(loc => L.marker([loc.lat, loc.lng])));
  map.fitBounds(group.getBounds().pad(0.1));
});