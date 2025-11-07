// Menunggu hingga seluruh konten halaman HTML dimuat
document.addEventListener('DOMContentLoaded', function() {

    // Ambil semua elemen yang dibutuhkan
    const navLinks = document.querySelectorAll('.sidebar a');
    const posDocuments = document.querySelectorAll('.pos-document');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('pos-nav');
    const content = document.getElementById('pos-content');

    // Fungsi untuk mengganti POS yang ditampilkan
    function switchPos(targetId) {
        // Sembunyikan semua dokumen
        posDocuments.forEach(function(doc) {
            doc.classList.remove('active');
        });

        // Hapus status 'active' dari semua link navigasi
        navLinks.forEach(function(nav) {
            nav.classList.remove('active');
        });

        // Tampilkan dokumen POS yang sesuai dengan target
        const targetDocument = document.getElementById(targetId);
        if (targetDocument) {
            targetDocument.classList.add('active');
        }

        // Tambahkan status 'active' ke link yang baru saja diklik
        const activeLink = document.querySelector(`.sidebar a[data-target="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Tutup sidebar di mobile setelah mengklik link
        if (window.innerWidth <= 768) {
            document.body.classList.remove('sidebar-open');
        }
    }

    // Tambahkan event listener 'click' ke setiap link navigasi
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Mencegah browser berpindah halaman
            event.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchPos(targetId);
        });
    });

    // Event listener untuk tombol menu mobile
    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-open');
    });
    
    // Event listener untuk menutup sidebar jika klik di luar area sidebar (di mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && document.body.classList.contains('sidebar-open')) {
            // Cek apakah klik *bukan* di sidebar DAN *bukan* di tombol toggle
            if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                document.body.classList.remove('sidebar-open');
            }
        }
    });

});
