let siswa = JSON.parse(localStorage.getItem("absensi")) || [];

function simpanData() {
    localStorage.setItem("absensi", JSON.stringify(siswa));
}

function tambahSiswa() {

    const nama = document.getElementById("nama").value.trim();

    if (nama === "") {
        alert("Masukkan nama siswa!");
        return;
    }

    siswa.push({
        nama: nama,
        status: "Hadir"
    });

    document.getElementById("nama").value = "";

    simpanData();
    tampilkanData();
}

function ubahStatus(index, status) {

    siswa[index].status = status;

    simpanData();
    tampilkanData();
}

function hapusSiswa(index) {

    if (confirm("Hapus data siswa ini?")) {

        siswa.splice(index, 1);

        simpanData();
        tampilkanData();
    }
}

function tampilkanData() {

    const tbody = document.getElementById("dataSiswa");

    tbody.innerHTML = "";

    let hadir = 0;
    let izin = 0;
    let sakit = 0;
    let alpa = 0;

    siswa.forEach((item, index) => {

        if (item.status === "Hadir") hadir++;
        if (item.status === "Izin") izin++;
        if (item.status === "Sakit") sakit++;
        if (item.status === "Alpa") alpa++;

        tbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>
                <select onchange="ubahStatus(${index}, this.value)">
                    <option value="Hadir" ${item.status=="Hadir"?"selected":""}>Hadir</option>
                    <option value="Izin" ${item.status=="Izin"?"selected":""}>Izin</option>
                    <option value="Sakit" ${item.status=="Sakit"?"selected":""}>Sakit</option>
                    <option value="Alpa" ${item.status=="Alpa"?"selected":""}>Alpa</option>
                </select>
            </td>
            <td>
                <button onclick="hapusSiswa(${index})">
                    Hapus
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById("hadir").textContent = hadir;
    document.getElementById("izin").textContent = izin;
    document.getElementById("sakit").textContent = sakit;
    document.getElementById("alpa").textContent = alpa;
}

tampilkanData();