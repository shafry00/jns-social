import { useState, useEffect } from 'react'
import { Heart, MapPin, Eye, GraduationCap, Users, Mic, Briefcase, Activity, Send, X, Mail, MapPin as Location, CheckCircle, Star, ArrowDown } from 'lucide-react'

const pillars = [
  { id: 'pendidikan', title: 'Pendidikan', icon: GraduationCap, color: 'bg-blue-500', campaigns: [
    { id: 'beasiswa', title: 'Beasiswa Anak Yatim', target: 50000000, raised: 32500000, donors: 145 },
    { id: 'sekolah', title: 'Sekolah Gratis', target: 25000000, raised: 18200000, donors: 89 },
    { id: 'les', title: 'Les Privat Gratis', target: 15000000, raised: 9800000, donors: 67 },
    { id: 'digital', title: 'Digital Literacy', target: 20000000, raised: 14100000, donors: 112 }
  ]},
  { id: 'sosial', title: 'Sosial', icon: Users, color: 'bg-purple-500', campaigns: [
    { id: 'sembako', title: 'Paket Sembako', target: 30000000, raised: 24800000, donors: 234 },
    { id: 'kesehatan', title: 'Bantuan Kesehatan', target: 40000000, raised: 28500000, donors: 156 },
    { id: 'panti', title: 'Bantuan Panti', target: 25000000, raised: 19200000, donors: 98 },
    { id: 'lingkungan', title: 'Clean Makassar', target: 15000000, raised: 11300000, donors: 87 }
  ]},
  { id: 'media-dakwah', title: 'Media & Dakwah', icon: Mic, color: 'bg-orange-500', campaigns: [
    { id: 'konten', title: 'Konten Dakwah', target: 10000000, raised: 7500000, donors: 56 },
    { id: 'webinar', title: 'Webinar Islami', target: 8000000, raised: 5200000, donors: 43 },
    { id: 'podcast', title: 'Podcast UIN', target: 12000000, raised: 9100000, donors: 78 },
    { id: 'campaign', title: 'Campaign Dakwah', target: 20000000, raised: 15800000, donors: 134 }
  ]},
  { id: 'sedekah-infaq', title: 'Sedekah & Infaq', icon: Heart, color: 'bg-emerald-500', campaigns: [
    { id: 'infaq', title: 'Infaq Sekarang', target: 50000000, raised: 42300000, donors: 312 },
    { id: 'sedekah', title: 'Sedekah Harian', target: 30000000, raised: 26800000, donors: 267 },
    { id: 'qurban', title: 'Qurban 2026', target: 40000000, raised: 31500000, donors: 189 },
    { id: 'monthly', title: 'Monthly Donor', target: 25000000, raised: 18200000, donors: 445 }
  ]},
  { id: 'ekonomi-ummat', title: 'Ekonomi Ummat', icon: Briefcase, color: 'bg-teal-600', campaigns: [
    { id: 'modal', title: 'Modal UMKM', target: 50000000, raised: 38500000, donors: 78 },
    { id: 'mentoring', title: 'Mentoring Bisnis', target: 20000000, raised: 14200000, donors: 45 },
    { id: 'pasar', title: 'Pasar Islami', target: 25000000, raised: 19800000, donors: 67 },
    { id: 'umkm', title: 'UMKM Makassar', target: 35000000, raised: 27100000, donors: 89 }
  ]}
]

const activities = [
  { title: 'Beasiswa 50 Anak Yatim', date: '20 Apr 2026', icon: GraduationCap },
  { title: 'Distribusi Paket Ramadan', date: '19 Apr 2026', icon: Star },
  { title: 'Pelatihan Digital Marketing', date: '18 Apr 2026', icon: Briefcase },
  { title: 'Bantuan Kesehatan Gratis', date: '17 Apr 2026', icon: Activity }
]

const donors = [
  { name: 'Ahmad Y.', amount: '500rb', time: 'Baru' },
  { name: 'Siti H.', amount: '100rb', time: '5 mnt' },
  { name: 'H. Abdul M.', amount: '1jt', time: '15 mnt' },
  { name: 'Dr. Faisal', amount: '250rb', time: '1 jam' }
]

function App() {
  const [activePillar, setActivePillar] = useState('pendidikan')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [donorData, setDonorData] = useState({ name: '', whatsapp: '', email: '' })
  const [donationAmount, setDonationAmount] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('jns_donor')
    if (saved) setDonorData(JSON.parse(saved))
  }, [])

  const currentPillar = pillars.find(p => p.id === activePillar)

  const formatRupiah = (num) => new Intl.NumberFormat('id-ID').format(num)

  const openModal = (pillarId, campaignId) => {
    const pillar = pillars.find(p => p.id === pillarId)
    const campaign = pillar.campaigns.find(c => c.id === campaignId)
    setSelectedCampaign({ pillar, campaign })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCampaign(null)
    setDonationAmount(0)
  }

  const submitDonation = () => {
    if (!donorData.name || !donorData.whatsapp || !donorData.email) {
      alert('Mohon lengkapi data diri')
      return
    }
    const amount = donationAmount
    if (!amount || amount < 1000) {
      alert('Pilih nominal donasi')
      return
    }
    localStorage.setItem('jns_donor', JSON.stringify(donorData))
    const { pillar, campaign } = selectedCampaign
    const message = `Halo Admin JNS Social, saya ${donorData.name} ingin donasi ${campaign.title} (${pillar.title}) Rp${formatRupiah(amount)}. WA: ${donorData.whatsapp}, Email: ${donorData.email}`
    const waNumber = '628XXXXXXXXXX'
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank')
    closeModal()
  }

  return (
    <div className="min-h-screen bg-cream-soft">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-deep to-teal-light flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-teal-deep block">JNS</span>
              <span className="font-display text-xs text-emerald-bright font-medium">SOCIAL</span>
            </div>
          </div>
          <a href="#contact" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600">
            <MapPin className="w-4 h-4" /> Makassar
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-cream-soft to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#006D77 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-7xl mx-auto px-4 py-20 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-emerald-bright" />
              <span className="text-sm font-medium text-gray-600">Makassar, Sulawesi Selatan</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-deep leading-tight mb-6">
              Menebar Manfaat,<br />
              <span className="text-emerald-bright">Membangun Ummat</span><br />
              di Kota Daeng
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              JNS Social hadir untuk kehidupan bermakna melalui lima pilar program: Pendidikan, Sosial, Media & Dakwah, Sedekah & Infaq, dan Ekonomi Ummat.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} className="bg-teal-deep hover:bg-teal-light text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-teal-deep/30 flex items-center gap-2">
                <Heart className="w-5 h-5" /> Donasi Sekarang
              </button>
              <a href="#transparency" className="border-2 border-teal-deep text-teal-deep font-semibold px-8 py-4 rounded-full transition-all hover:bg-teal-deep hover:text-white flex items-center gap-2">
                <Eye className="w-5 h-5" /> Lihat Transparansi
              </a>
            </div>
          </div>
          <div className="flex justify-center gap-8 pt-8 border-t border-gray-200 mx-auto max-w-lg">
            {[{ n: '5', l: 'Pilar' }, { n: '20', l: 'Campaign' }, { n: '100%', l: 'Transparan' }].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-2xl lg:text-3xl font-bold text-teal-deep">{item.n}</div>
                <div className="text-sm text-gray-500">{item.l} Program</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-emerald-bright/10 text-emerald-bright font-medium px-4 py-2 rounded-full text-sm mb-4">PROGRAM KAMI</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-teal-deep mb-4">Pilar Program Kebaikan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Pilih salah satu pilar untuk melihat campaign donasi.</p>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap mb-10" id="pillarContainer">
            {pillars.map((p, idx) => (
              <button key={p.id} onClick={() => setActivePillar(p.id)} className={`flex-shrink-0 w-36 sm:w-40 p-4 rounded-2xl bg-white shadow-lg border-2 transition-all ${activePillar === p.id ? 'border-emerald-bright ring-2 ring-emerald-bright/30' : 'border-transparent'}`}>
                <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center mx-auto mb-3`}>
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-800">{p.title}</p>
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {currentPillar.campaigns.map(c => {
              const percent = Math.round((c.raised / c.target) * 100)
              return (
                <div key={c.id} className="w-full sm:w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y1 transition-all">
                  <div className="h-2 bg-gray-100"><div className="h-full bg-emerald-bright transition-all" style={{ width: `${percent}%` }}></div></div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500 uppercase">{currentPillar.title}</p>
                        <p className="font-semibold mt-1">{c.title}</p>
                      </div>
                      <span className="text-xs bg-emerald-bright/10 text-emerald-bright px-2 py-1 rounded-full">{percent}%</span>
                    </div>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Terkumpul</span><span className="font-medium text-emerald-bright">Rp{formatRupiah(c.raised)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Target</span><span className="font-medium">Rp{formatRupiah(c.target)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Donatur</span><span className="font-medium">{c.donors} orang</span></div>
                    </div>
                    <button onClick={() => openModal(currentPillar.id, c.id)} className="w-full bg-teal-deep hover:bg-teal-light text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2">
                      <Heart className="w-4 h-4" /> Donasi Sekarang
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparency" className="py-16 lg:py-24 bg-gradient-to-b from-cream-soft to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-teal-deep/10 text-teal-deep font-medium px-4 py-2 rounded-full text-sm mb-4">TRANSPARANSI</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-teal-deep mb-4">Laporan Aktivitas</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-bright/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-bright" />
                </div>
                <h3 className="font-display text-lg font-bold text-teal-deep">Aktivitas Terkini</h3>
              </div>
              <div className="space-y-3">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-lg bg-emerald-bright/10 flex items-center justify-center">
                      <a.icon className="w-4 h-4 text-emerald-bright" />
                    </div>
                    <div className="flex-1"><p className="text-sm font-medium">{a.title}</p><p className="text-xs text-gray-500">{a.date}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-bright/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-bright" />
                </div>
                <h3 className="font-display text-lg font-bold text-teal-deep">Donatur Terkini</h3>
              </div>
              <div className="space-y-3">
                {donors.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-teal-deep/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-teal-deep">{d.name[0]}</span>
                    </div>
                    <div className="flex-1"><p className="text-sm font-medium">{d.name}</p><p className="text-xs text-gray-500">{d.time}</p></div>
                    <p className="text-sm font-medium text-emerald-bright">{d.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 lg:py-24 bg-teal-deep">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-4">Hubungi Kami</h2>
              <p className="text-teal-light/80 mb-8">Memiliki pertanyaan atau ingin berkolaborasi?</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Location className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">Kantor Makassar</div>
                    <div className="text-teal-light/80 text-sm">Jl. Perintis Kemerdekaan No.XX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-teal-light/80 text-sm">info@jnssocial.org</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-display text-lg font-bold text-teal-deep mb-4">Legal</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Yayasan</span>
                  <span className="font-medium">Yayasan JNS Social</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium text-emerald-bright flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-teal-deep px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-emerald-bright" />
                <span className="font-semibold text-white">Donasi</span>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">Donasi untuk</p>
              <p className="font-semibold text-teal-deep">{selectedCampaign.pillar.title} - {selectedCampaign.campaign.title}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-3">Pilih nominal:</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[20000, 50000, 100000].map(amt => (
                  <button key={amt} onClick={() => setDonationAmount(amt)} className={`p-3 border-2 rounded-lg text-center transition-all ${donationAmount === amt ? 'bg-teal-deep text-white border-teal-deep' : 'border-gray-200 hover:border-teal-deep'}`}>
                    <div className="font-bold">{amt / 1000}rb</div>
                  </button>
                ))}
              </div>
              <input type="number" placeholder="Nominal custom (Rp)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-deep focus:outline-none mb-4"
                onChange={e => setDonationAmount(parseInt(e.target.value) || 0)} />
              <p className="text-sm text-gray-600 mb-3">Data diri:</p>
              <div className="space-y-3">
                <input type="text" placeholder="Nama Lengkap" value={donorData.name} onChange={e => setDonorData({ ...donorData, name: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-deep focus:outline-none" />
                <input type="tel" placeholder="WhatsApp" value={donorData.whatsapp} onChange={e => setDonorData({ ...donorData, whatsapp: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-deep focus:outline-none" />
                <input type="email" placeholder="Email" value={donorData.email} onChange={e => setDonorData({ ...donorData, email: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-teal-deep focus:outline-none" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">Transfer:</p>
              <div className="text-sm space-y-1 mb-3">
                <div className="flex justify-between"><span className="text-gray-500">Bank Makassar</span><span className="font-medium">XXXX XXXX XXXX</span></div>
                <div className="flex justify-between"><span className="text-gray-500">A.n</span><span className="font-medium">Yayasan JNS Social</span></div>
              </div>
              <button onClick={submitDonation} className="w-full bg-emerald-bright text-teal-deep font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-500">
                <Send className="w-4 h-4" /> Konfirmasi via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App