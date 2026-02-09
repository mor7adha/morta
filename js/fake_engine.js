// Fake Data Engine for Static Site - Super Admin Version

const IPS = [
    "192.168.1.10", "192.168.1.15", "192.168.1.22", "192.168.1.55",
    "10.0.0.5", "10.0.0.12", "172.16.1.100", "172.16.2.50"
];

const ATTACK_TYPES = [
    "SYN Flood", "UDP Flood", "ICMP Flood", "Slowloris",
    "Smurf Attack", "Neptune", "Pod", "Teardrop",
    "Land", "Back", "Apache2", "Mailbomb"
];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Session Management
window.checkLogin = function () {
    if (!sessionStorage.getItem('user')) {
        // Auto-login as Super Admin for demo convenience if not logged in
        sessionStorage.setItem('user', 'SuperAdmin');
        sessionStorage.setItem('role', 'Super_Admin');
    }
    const roleEl = document.querySelector('.role-badge');
    // Force display as Super Admin
    if (roleEl) roleEl.textContent = 'Super Admin';
};

window.doLogin = function (u, p) {
    sessionStorage.setItem('user', u || 'SuperAdmin');
    sessionStorage.setItem('role', 'Super_Admin');
    window.location.href = 'index.html';
    return false;
};

window.doLogout = function () {
    sessionStorage.clear();
    window.location.href = 'login.html';
};


// Data Generators
window.generateMetrics = function () {
    const syn = getRandomInt(100, 5000);
    const synack = Math.floor(syn * (Math.random() * 0.5 + 0.1));
    return {
        syn_per_sec: syn,
        synack_per_sec: synack,
        syn_to_ack_ratio: (syn / synack).toFixed(2),
        rst_per_sec: getRandomInt(0, 50),
        udp_ports: [
            { port: 53, pps: getRandomInt(10, 200) },
            { port: 80, pps: getRandomInt(50, 500) },
            { port: 443, pps: getRandomInt(50, 600) },
            { port: 123, pps: getRandomInt(1, 50) }
        ],
        icmp_types: [
            { type: "Echo Request", pps: getRandomInt(0, 100) },
            { type: "Dest Unreach", pps: getRandomInt(0, 10) }
        ]
    };
};

window.generatePackets = function () {
    const packets = [];
    const count = getRandomInt(5, 15);
    for (let i = 0; i < count; i++) {
        packets.push({
            id: getRandomInt(10000, 99999),
            ts: new Date().toISOString().split('T')[1].split('.')[0],
            src: getRandomItem(IPS),
            dst: "192.168.1.200",
            proto: getRandomItem(["TCP", "UDP", "ICMP"]),
            sport: getRandomInt(1024, 65535),
            dport: getRandomInt(1, 10000),
            length: getRandomInt(40, 1500)
        });
    }
    return packets;
};

window.generateAttacks = function (count = 20) {
    const list = [];
    for (let i = 0; i < count; i++) {
        list.push({
            start_time: new Date(Date.now() - getRandomInt(0, 10000000)).toISOString(),
            attack_type: getRandomItem(ATTACK_TYPES),
            src_ip: getRandomItem(IPS),
            req_per_min: getRandomInt(1000, 50000),
            details: "Simulated Attack",
            score: (Math.random() * 0.5 + 0.5).toFixed(2)
        });
    }
    return list.sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
};

// Super Admin Data
window.generateRequests = function () {
    return [
        { id: 1, username: "john_doe", excuse: "Forgot password after vacation", date: "2025-10-01 09:00:00" },
        { id: 2, username: "jane_smith", excuse: "Laptop crashed, lost credentials", date: "2025-10-02 14:30:00" },
        { id: 3, username: "auditor_1", excuse: "Need reset for compliance check", date: "2025-10-03 11:15:00" }
    ];
};

window.generateUsers = function () {
    return [
        { id: 1, username: "admin", role: "admin", created_at: "2024-01-01" },
        { id: 2, username: "Auditor", role: "auditor", created_at: "2024-02-15" },
        { id: 3, username: "SuperAdmin", role: "super_admin", created_at: "2023-12-01" },
        { id: 4, username: "user_john", role: "user", created_at: "2024-05-20" },
        { id: 5, username: "user_jane", role: "user", created_at: "2024-06-10" }
    ];
};
