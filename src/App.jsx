import { useState, useEffect, useRef } from 'react'
import { 
  Heart, MapPin, Eye, GraduationCap, Users, Mic, Briefcase, Send, X, Mail, 
  MapPin as Location, CheckCircle, Sparkles, Star, ArrowRight, HandHeart, 
  ChevronLeft, ChevronRight, Clock
} from 'lucide-react'

const activities = [
  { id: 1, title: 'Beasiswa Anak Yatim', pillar: 'Pendidikan', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', date: '20 Apr 2026' },
  { id: 2, title: 'Distribusi Paket Sembako', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop', date: '19 Apr 2026' },
  { id: 3, title: 'Bantuan Kesehatan', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', date: '18 Apr 2026' },
  { id: 4, title: 'Webinar Islami', pillar: 'Media & Dakwah', image: 'https://images.unsplash.com/photo-1591115765373-ed8b0e5a8a23?w=600&h=400&fit=crop', date: '17 Apr 2026' },
  { id: 5, title: 'Qurban 2026', pillar: 'Sedekah & Infaq', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7e99f?w=600&h=400&fit=crop', date: '16 Apr 2026' },
  { id: 6, title: 'Modal UMKM Makassar', pillar: 'Ekonomi Ummat', image: 'https://images.unsplash.com/photo-1556742049-0c23a7e4ab7c?w=600&h=400&fit=crop', date: '15 Apr 2026' },
  { id: 7, title: 'Les Privat Gratis', pillar: 'Pendidikan', image: 'https://images.unsplash.com/photo-1434030216411-0b793b9d9f1d?w=600&h=400&fit=crop', date: '14 Apr 2026' },
  { id: 8, title: 'Panti Asuhan', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&h=400&fit=crop', date: '13 Apr 2026' },
]

const donors = [
  { name: 'Ahmad Y.', amount: '500rb', time: 'Baru' },
  { name: 'Siti H.', amount: '100rb', time: '5 mnt' },
  { name: 'H. Abdul M.', amount: '1jt', time: '15 mnt' },
  { name: 'Dr. Faisal', amount: '250rb', time: '1 jam' },
  { name: 'Ibu Minah', amount: '75rb', time: '2 jam' },
  { name: 'Pak Hamid', amount: '200rb', time: '3 jam' },
]

const pillars = [
  { id: 'pendidikan', title: 'Pendidikan', icon: GraduationCap, color: 'bg-blue-500', gradient: 'from-blue-500 to-blue-700', campaigns: [
    { id: 'beasiswa', title: 'Beasiswa Anak Yatim', image: 'https://images.unsplash.com/photo-1503676260728-1c00da1a492d?w=400&h=250&fit=crop', target: 50000000, raised: 32500000, donors: 145 },
    { id: 'sekolah', title: 'Sekolah Gratis', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop', target: 25000000, raised: 18200000, donors: 89 },
    { id: 'les', title: 'Les Privat Gratis', image: 'https://images.unsplash.com/photo-1434030216411-0b793b9d9f1d?w=400&h=250&fit=crop', target: 15000000, raised: 9800000, donors: 67 },
    { id: 'digital', title: 'Digital Literacy', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e499b9?w=400&h=250&fit=crop', target: 20000000, raised: 14100000, donors: 112 }
  ]},
  { id: 'sosial', title: 'Sosial', icon: Users, color: 'bg-purple-500', gradient: 'from-purple-500 to-purple-700', campaigns: [
    { id: 'sembako', title: 'Paket Sembako', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop', target: 30000000, raised: 24800000, donors: 234 },
    { id: 'kesehatan', title: 'Bantuan Kesehatan', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop', target: 40000000, raised: 28500000, donors: 156 },
    { id: 'panti', title: 'Bantuan Panti', image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&h=250&fit=crop', target: 25000000, raised: 19200000, donors: 98 },
    { id: 'lingkungan', title: 'Clean Makassar', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop', target: 15000000, raised: 11300000, donors: 87 }
  ]},
  { id: 'media-dakwah', title: 'Media & Dakwah', icon: Mic, color: 'bg-orange-500', gradient: 'from-orange-500 to-orange-700', campaigns: [
    { id: 'konten', title: 'Konten Dakwah', image: 'https://images.unsplash.com/photo-1594736797935-d09bc5b33f1a?w=400&h=250&fit=crop', target: 10000000, raised: 7500000, donors: 56 },
    { id: 'webinar', title: 'Webinar Islami', image: 'https://images.unsplash.com/photo-1591115765373-ed8b0e5a8a23?w=400&h=250&fit=crop', target: 8000000, raised: 5200000, donors: 43 },
    { id: 'podcast', title: 'Podcast UIN', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop', target: 12000000, raised: 9100000, donors: 78 },
    { id: 'campaign', title: 'Campaign Dakwah', image: 'https://images.unsplash.com/photo-1600038224101-5f1f40bc5d6a?w=400&h=250&fit=crop', target: 20000000, raised: 15800000, donors: 134 }
  ]},
  { id: 'sedekah-infaq', title: 'Sedekah & Infaq', icon: Heart, color: 'bg-emerald-500', gradient: 'from-emerald-500 to-emerald-700', campaigns: [
    { id: 'infaq', title: 'Infaq Sekarang', image: 'https://images.unsplash.com/photo-1594708767771-a25160e4c8b4?w=400&h=250&fit=crop', target: 50000000, raised: 42300000, donors: 312 },
    { id: 'sedekah', title: 'Sedekah Harian', image: 'https://images.unsplash.com/photo-1559027615-cd4627622ead?w=400&h=250&fit=crop', target: 30000000, raised: 26800000, donors: 267 },
    { id: 'qurban', title: 'Qurban 2026', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7e99f?w=400&h=250&fit=crop', target: 40000000, raised: 31500000, donors: 189 },
    { id: 'monthly', title: 'Monthly Donor', image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=400&h=250&fit=crop', target: 25000000, raised: 18200000, donors: 445 }
  ]},
  { id: 'ekonomi-ummat', title: 'Ekonomi Ummat', icon: Briefcase, color: 'bg-teal-600', gradient: 'from-teal-600 to-teal-800', campaigns: [
    { id: 'modal', title: 'Modal UMKM', image: 'https://images.unsplash.com/photo-1556742049-0c23a7e4ab7c?w=400&h=250&fit=crop', target: 50000000, raised: 38500000, donors: 78 },
    { id: 'mentoring', title: 'Mentoring Bisnis', image: 'https://images.unsplash.com/photo-1559136555-c9305db8a925?w=400&h=250&fit=crop', target: 20000000, raised: 14200000, donors: 45 },
    { id: 'pasar', title: 'Pasar Islami', image: 'https://images.unsplash.com/photo-1595246140625-573b715c11dc?w=400&h=250&fit=crop', target: 25000000, raised: 19800000, donors: 67 },
    { id: 'umkm', title: 'UMKM Makassar', image: 'https://images.unsplash.com/photo-1600880292203-47a7d3bf8bb1?w=400&h=250&fit=crop', target: 35000000, raised: 27100000, donors: 89 }
  ]}
]

function App() {
  const [activePillar, setActivePillar] = useState('pendidikan')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [donorData, setDonorData] = useState({ name: '', whatsapp: '', email: '' })
  const [donationAmount, setDonationAmount] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const galleryRef = useRef(null)

  const currentPillar = pillars.find(p => p.id === activePillar)
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID').format(num)

  useEffect(() => {
    setLoaded(true)
    const saved = localStorage.getItem('jns_donor')
    if (saved) setDonorData(JSON.parse(saved))
  }, [])

  // Auto-scroll gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex(prev => (prev + 1) % activities.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const openModal = (pillarId, campaignId) => {
    const pillar = pillars.find(p => p.id === pillarId)
    const campaign = pillar.campaigns.find(c => c.id === campaignId)
    setSelectedCampaign({ pillar, campaign })
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCampaign(null)
    setDonationAmount(0)
    document.body.style.overflow = ''
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

  const prevGallery = () => setGalleryIndex(prev => (prev - 1 + activities.length) % activities.length)
  const nextGallery = () => setGalleryIndex(prev => (prev + 1) % activities.length)

  return (
    <div className="min-h-screen bg-cream-soft">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-deep to-teal-light flex items-center justify-center shadow-lg shadow-teal-deep/30">
              <Heart className="w-5 h-5 text-white" fill="#06D6A0" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-teal-deep block tracking-tight">JNS</span>
              <span className="font-display text-xs text-emerald-bright font-medium tracking-widest uppercase">Social</span>
            </div>
          </div>
          <a href="#contact" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-deep transition-colors">
            <MapPin className="w-4 h-4" /> Makassar
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 bg-gradient-to-b from-cream-soft via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#006D77 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-emerald-bright/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-teal-deep/10 rounded-full blur-3xl"></div>
        
        <div className={`max-w-7xl mx-auto px-4 py-20 relative transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-8 shadow-lg shadow-teal-deep/5">
              <Sparkles className="w-4 h-4 text-emerald-bright animate-pulse" />
              <span className="text-sm font-medium text-gray-600">Makassar, Sulawesi Selatan</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-teal-deep leading-[1.1] mb-8 tracking-tight">
              Menebar Manfaat,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-bright to-teal-deep">Membangun Ummat</span><br />
              <span className="text-gray-400">di Kota Daeng</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              <span className="font-medium text-teal-deep">JNS Social</span> hadir untuk kehidupan bermakna melalui lima pilar program: <span className="font-medium">Pendidikan</span>, <span className="font-medium">Sosial</span>, <span className="font-medium">Media & Dakwah</span>, <span className="font-medium">Sedekah & Infaq</span>, dan <span className="font-medium">Ekonomi Ummat</span>.
            </p>
            
            <button 
              onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} 
              className="group bg-teal-deep hover:bg-teal-light text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-teal-deep/30 hover:scale-105 active:scale-95 flex items-center gap-3 relative overflow-hidden"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 group-active:scale-90 transition-transform duration-200" />
              <span>Donasi Sekarang</span>
            </button>
            <a href="#transparency" 
              className="border-2 border-teal-deep text-teal-deep font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:bg-teal-deep hover:text-white hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Eye className="w-5 h-5" /> Lihat Transparansi
            </a>
          </div>
          
          <div className="flex justify-center gap-12 pt-10 border-t border-gray-200/50 mx-auto max-w-2xl">
            {[
              { n: '5', l: 'Pilar Program', icon: Sparkles },
              { n: '20', l: 'Campaign Aktif', icon: Star },
              { n: '100%', l: 'Transparan', icon: CheckCircle }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <item.icon className="w-6 h-6 text-teal-deep/50 mx-auto mb-2 group-hover:text-emerald-bright transition-colors" />
                <div className="font-display text-3xl lg:text-4xl font-bold text-teal-deep">{item.n}</div>
                <div className="text-sm text-gray-400 font-medium">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-6 h-6 text-teal-deep/50 rotate-90" />
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-emerald-bright/10 text-emerald-bright font-medium px-4 py-2 rounded-full text-sm mb-4">PROGRAM KAMI</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-teal-deep mb-4">Pilar Program Kebaikan</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Pilih salah satu pilar untuk melihat campaign donasi yang tersedia.</p>
          </div>
          
          {/* Pillar Cards - Horizontal */}
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            {pillars.map((p, idx) => (
              <button 
                key={p.id} 
                onClick={() => setActivePillar(p.id)}
                className={`group flex-shrink-0 w-40 p-5 rounded-2xl transition-all duration-500 cursor-pointer ${
                  activePillar === p.id 
                    ? `bg-white shadow-2xl ring-2 ring-emerald-bright scale-105` 
                    : 'bg-white/50 shadow-lg hover:shadow-xl hover:scale-102'
                }`}
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  transform: loaded ? 'scale(1)' : 'scale(0.9)',
                  opacity: loaded ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${idx * 100}ms`
                }}
              >
                <div className={`w-14 h-14 rounded-2xl ${p.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <p.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-center">{p.title}</p>
              </button>
            ))}
          </div>
          
          {/* Campaign Grid */}
          <div className="flex flex-wrap gap-6 justify-center">
            {currentPillar.campaigns.map((c, idx) => {
              const percent = Math.round((c.raised / c.target) * 100)
              return (
                <div 
                  key={c.id} 
                  className="group w-full sm:w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
                  onClick={() => openModal(currentPillar.id, c.id)}
                  style={{
                    animationDelay: `${(idx + 5) * 100}ms`,
                    transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                    opacity: loaded ? 1 : 0,
                    transition: `all 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${(idx + 5) * 100}ms`
                  }}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => e.target.style.display = 'none'} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentPillar.gradient} opacity-60`}></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-white/90 text-xs font-medium">{currentPillar.title}</span>
                      <span className="bg-white/90 text-teal-deep text-xs font-bold px-2 py-1 rounded-full">{percent}%</span>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-teal-deep/0 group-hover:bg-teal-deep/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="bg-white text-teal-deep font-semibold px-4 py-2 rounded-full flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Heart className="w-4 h-4" /> Donasi
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-gray-800 mb-4">{c.title}</h3>
                    
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-emerald-bright to-teal-deep rounded-full transition-all duration-1000`} 
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Terkumpul</span>
                        <span className="font-semibold text-emerald-bright">Rp{formatRupiah(c.raised)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target</span>
                        <span className="font-medium text-gray-600">Rp{formatRupiah(c.target)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Donatur</span>
                        <span className="font-medium text-gray-600">{c.donors} orang</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => openModal(currentPillar.id, c.id)}
                      className="w-full bg-teal-deep hover:bg-teal-light text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
                    >
                      <Heart className="w-4 h-4" /> Donasi Sekarang
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparency - Gallery Section */}
      <section id="transparency" className="py-20 lg:py-28 bg-gradient-to-b from-cream-soft to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-deep/10 text-teal-deep font-medium px-4 py-2 rounded-full text-sm mb-4">TRANSPARANSI</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-teal-deep mb-4">Bukti Penyaluran</h2>
            <p className="text-gray-500 max-w-xl mx-auto">See firsthand the impact of your generosity through our documentation.</p>
          </div>

          {/* Photo Gallery Carousel */}
          <div className="relative" ref={galleryRef}>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <div className="relative aspect-square max-w-2xl mx-auto">
                {activities.map((activity, idx) => (
                  <div 
                    key={activity.id}
                    className={`absolute inset-0 transition-all duration-700 ${idx === galleryIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    style={{ transform: idx === galleryIndex ? 'translateX(0)' : 'translateX(100%)' }}
                  >
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" fill="%23f1f5f9"%3E%3Crect width="400" height="250" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14"%3EImage not available%3C/text%3E%3C/svg%3E'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block bg-emerald-bright text-teal-deep text-xs font-bold px-3 py-1 rounded-full mb-2">{activity.pillar}</span>
                      <h3 className="text-white text-xl sm:text-2xl font-bold">{activity.title}</h3>
                      <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
                        <Clock className="w-4 h-4" /> {activity.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button onClick={prevGallery} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronLeft className="w-6 h-6 text-teal-deep" />
              </button>
              <button onClick={nextGallery} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors">
                <ChevronRight className="w-6 h-6 text-teal-deep" />
              </button>
              
{/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {activities.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-gradient-to-br from-teal-deep via-teal-deep to-teal-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-4">Hubungi Kami</h2>
              <p className="text-teal-light/80 text-lg mb-10">Memiliki pertanyaan atau ingin berkolaborasi?</p>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-white p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Location className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">Kantor Makassar</div>
                    <div className="text-teal-light/70 text-sm">Jl. Perintis Kemerdekaan No.XX, Sulawesi Selatan</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-teal-light/70 text-sm">info@jnssocial.org</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <HandHeart className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-teal-light/70 text-sm">+62 XXX XXXX XXXX</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="font-display text-2xl font-bold text-teal-deep mb-6">Informasi Legal</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Nama Yayasan</span>
                  <span className="font-semibold text-gray-800">Yayasan JNS Social</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">SK Kemenkumham</span>
                  <span className="font-semibold text-gray-800">AHU-XXXXXX</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">NPWP</span>
                  <span className="font-semibold text-gray-800">XX.XXX.XXX.X-XXXX</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-500">Status</span>
                  <span className="font-semibold text-emerald-bright flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Terverifikasi
                  </span>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4">Ikuti kami:</p>
                <div className="flex gap-3">
                  {['instagram', 'facebook', 'youtube', 'twitter'].map((social) => (
                    <button key={social} className="w-10 h-10 rounded-lg bg-teal-deep/5 flex items-center justify-center hover:bg-teal-deep hover:text-white transition-colors">
                      <span className="text-sm font-medium capitalize">{social[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {modalOpen && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-deep to-teal-light px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-bright" fill="#06D6A0" />
                  </div>
                  <span className="font-semibold text-white text-lg">Donasi</span>
                </div>
                <button onClick={closeModal} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            {/* Campaign Info */}
            <div className="px-6 py-5 border-b border-gray-100">
              <p className="text-sm text-gray-400">Donasi untuk</p>
              <p className="font-display text-lg font-bold text-teal-deep">{selectedCampaign.pillar.title} - {selectedCampaign.campaign.title}</p>
            </div>
            
            {/* Form */}
            <div className="px-6 py-5">
              <p className="text-sm font-medium text-gray-700 mb-3">Pilih nominal:</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[20000, 50000, 100000].map(amt => (
                  <button 
                    key={amt} 
                    onClick={() => setDonationAmount(amt)}
                    className={`py-3 border-2 rounded-xl text-center font-bold transition-all duration-200 ${
                      donationAmount === amt 
                        ? 'bg-teal-deep text-white border-teal-deep shadow-lg shadow-teal-deep/30' 
                        : 'border-gray-200 hover:border-teal-deep hover:bg-teal-deep/5'
                    }`}
                  >
                    {amt / 1000}rb
                  </button>
                ))}
              </div>
              
              <input 
                type="number" 
                placeholder="Nominal custom (Rp)" 
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 mb-5 transition-all duration-200"
                onChange={e => setDonationAmount(parseInt(e.target.value) || 0)}
              />
              
              <p className="text-sm font-medium text-gray-700 mb-3">Data diri:</p>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  value={donorData.name} 
                  onChange={e => setDonorData({ ...donorData, name: e.target.value })} 
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 transition-all duration-200" 
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp" 
                  value={donorData.whatsapp} 
                  onChange={e => setDonorData({ ...donorData, whatsapp: e.target.value })} 
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 transition-all duration-200" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={donorData.email} 
                  onChange={e => setDonorData({ ...donorData, email: e.target.value })} 
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 transition-all duration-200" 
                />
              </div>
            </div>
            
            {/* Payment & Submit */}
            <div className="px-6 py-5 bg-gradient-to-b from-gray-50 to-white">
              <p className="text-sm font-medium text-gray-700 mb-3">Metode Pembayaran:</p>
              <div className="bg-gray-50 rounded-xl p-4 mb-5">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bank Makassar</span>
                    <span className="font-semibold">XXXX XXXX XXXX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">A.n</span>
                    <span className="font-semibold">Yayasan JNS Social</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={submitDonation}
                className="w-full bg-gradient-to-r from-emerald-bright to-emerald-400 text-teal-deep font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-emerald-bright/30 transition-all duration-300"
              >
                <Send className="w-5 h-5" /> Konfirmasi via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease forwards; }
        .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}

export default App