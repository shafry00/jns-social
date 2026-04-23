import { useState, useEffect, useRef } from 'react'
import { 
  Heart, MapPin, Eye, GraduationCap, Users, Mic, Briefcase, Send, X, Mail, 
  MapPin as Location, CheckCircle, Sparkles, Star, ArrowRight, HandHeart, 
  ChevronLeft, ChevronRight, Clock, Quote, ArrowUpRight, HeartHandshake, Target, Shield, Upload
} from 'lucide-react'

const activities = [
  { id: 1, title: 'Beasiswa Anak Yatim', pillar: 'Pendidikan', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop', date: '20 Apr 2026' },
  { id: 2, title: 'Distribusi Paket Sembako', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=600&fit=crop', date: '19 Apr 2026' },
  { id: 3, title: 'Bantuan Kesehatan', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop', date: '18 Apr 2026' },
  { id: 4, title: 'Webinar Islami', pillar: 'Media & Dakwah', image: 'https://images.unsplash.com/photo-1591115765373-ed8b0e5a8a23?w=600&h=600&fit=crop', date: '17 Apr 2026' },
  { id: 5, title: 'Qurban 2026', pillar: 'Sedekah & Infaq', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7e99f?w=600&h=600&fit=crop', date: '16 Apr 2026' },
  { id: 6, title: 'Modal UMKM Makassar', pillar: 'Ekonomi Ummat', image: 'https://images.unsplash.com/photo-1556742049-0c23a7e4ab7c?w=600&h=600&fit=crop', date: '15 Apr 2026' },
  { id: 7, title: 'Les Privat Gratis', pillar: 'Pendidikan', image: 'https://images.unsplash.com/photo-1434030216411-0b793b9d9f1d?w=600&h=600&fit=crop', date: '14 Apr 2026' },
  { id: 8, title: 'Panti Asuhan', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=600&h=600&fit=crop', date: '13 Apr 2026' },
]

const pillars = [
  { 
    id: 'pendidikan', 
    title: 'Pendidikan', 
    icon: GraduationCap, 
    color: 'bg-blue-500', 
    gradient: 'from-blue-500 to-blue-700', 
    tagline: 'Wujudkan Mimpi Mereka',
    description: 'Ribuan anak di Makassar terancam kehilangan kesempatan belajar karena keterbatasan ekonomi. Setiap donasi Anda bisa membantu mereka tetap sekolah dan bermimpi besar.',
    reasons: [
      'Anak yatim mendapatkan chance yang sama untuk pendidikan',
      'Bantu mereka kuliiah dengan biaya tercukupi',
      'Les privat gratis untuk siapkan masa depan cerah',
      'Tablet dan laptop untuk anak tidak mampu'
    ],
    campaigns: [
      { id: 'beasiswa', title: 'Beasiswa Anak Yatim', image: 'https://images.unsplash.com/photo-1503676260728-1c00da1a492d?w=400&h=250&fit=crop', target: 50000000, raised: 32500000, donors: 145 },
      { id: 'sekolah', title: 'Sekolah Gratis', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop', target: 25000000, raised: 18200000, donors: 89 },
      { id: 'les', title: 'Les Privat Gratis', image: 'https://images.unsplash.com/photo-1434030216411-0b793b9d9f1d?w=400&h=250&fit=crop', target: 15000000, raised: 9800000, donors: 67 },
      { id: 'digital', title: 'Digital Literacy', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e499b9?w=400&h=250&fit=crop', target: 20000000, raised: 14100000, donors: 112 }
    ]
  },
  { 
    id: 'sosial', 
    title: 'Sosial', 
    icon: Users, 
    color: 'bg-purple-500', 
    gradient: 'from-purple-500 to-purple-700', 
    tagline: 'Uluran Tangan Kita',
    description: 'Bantuan sosial untuk saudara-saudara kita yang membutuhkan. Dari paket kebutuhan dasar hingga bantuan kesehatan, kami hadir untuk meringankan beban mereka.',
    reasons: [
      'Distribusi paket Sembako setiap bulan',
      'Bantuan biaya pengobatan dan operasi',
      'Dukungan untuk panti asuhan',
      'Program lingkungan bersih Makassar'
    ],
    campaigns: [
      { id: 'sembako', title: 'Paket Sembako', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop', target: 30000000, raised: 24800000, donors: 234 },
      { id: 'kesehatan', title: 'Bantuan Kesehatan', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop', target: 40000000, raised: 28500000, donors: 156 },
      { id: 'panti', title: 'Bantuan Panti', image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&h=250&fit=crop', target: 25000000, raised: 19200000, donors: 98 },
      { id: 'lingkungan', title: 'Clean Makassar', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop', target: 15000000, raised: 11300000, donors: 87 }
    ]
  },
  { 
    id: 'media-dakwah', 
    title: 'Media & Dakwah', 
    icon: Mic, 
    color: 'bg-orange-500', 
    gradient: 'from-orange-500 to-orange-700', 
    tagline: 'Menyebarkan Kebenaran',
    description: 'Konten dakwah Islami yang edukatif dan relevan untuk ummat di era digital. Kami memproduksi berbagai konten untuk memudahkan传播 ilmu agama.',
    reasons: [
      'Konten dakwah di platform digital',
      'Webinar Islami dengan ustadz ternama',
      'Podcast pembelajaran Al-Quran',
      'Campaign dakwah ke daerah terpencil'
    ],
    campaigns: [
      { id: 'konten', title: 'Konten Dakwah', image: 'https://images.unsplash.com/photo-1594736797935-d09bc5b33f1a?w=400&h=250&fit=crop', target: 10000000, raised: 7500000, donors: 56 },
      { id: 'webinar', title: 'Webinar Islami', image: 'https://images.unsplash.com/photo-1591115765373-ed8b0e5a8a23?w=400&h=250&fit=crop', target: 8000000, raised: 5200000, donors: 43 },
      { id: 'podcast', title: 'Podcast UIN', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=250&fit=crop', target: 12000000, raised: 9100000, donors: 78 },
      { id: 'campaign', title: 'Campaign Dakwah', image: 'https://images.unsplash.com/photo-1600038224101-5f1f40bc5d6a?w=400&h=250&fit=crop', target: 20000000, raised: 15800000, donors: 134 }
    ]
  },
  { 
    id: 'sedekah-infaq', 
    title: 'Sedekah & Infaq', 
    icon: Heart, 
    color: 'bg-emerald-500', 
    gradient: 'from-emerald-500 to-emerald-700', 
    tagline: 'Beramal dengan Hati',
    description: 'Menghimpun dan menyalurkan sedekah dan infaq untuk kepentingan ummat. Setiap rupiah yang masuk akan kami salurkan dengan penuh amanah.',
    reasons: [
      '100% dana tersalurkan ke penerima manfaat',
      'Laporan keuangan transparan dan audit',
      'Beragam program infaq harian dan bulanan',
      'Program qurban untuk sesama'
    ],
    campaigns: [
      { id: 'infaq', title: 'Infaq Sekarang', image: 'https://images.unsplash.com/photo-1594708767771-a25160e4c8b4?w=400&h=250&fit=crop', target: 50000000, raised: 42300000, donors: 312 },
      { id: 'sedekah', title: 'Sedekah Harian', image: 'https://images.unsplash.com/photo-1559027615-cd4627622ead?w=400&h=250&fit=crop', target: 30000000, raised: 26800000, donors: 267 },
      { id: 'qurban', title: 'Qurban 2026', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7e99f?w=400&h=250&fit=crop', target: 40000000, raised: 31500000, donors: 189 },
      { id: 'monthly', title: 'Monthly Donor', image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=400&h=250&fit=crop', target: 25000000, raised: 18200000, donors: 445 }
    ]
  },
  { 
    id: 'ekonomi-ummat', 
    title: 'Ekonomi Ummat', 
    icon: Briefcase, 
    color: 'bg-teal-600', 
    gradient: 'from-teal-600 to-teal-800', 
    tagline: 'Membangun Kemandirian',
    description: 'Memberdayakan pelaku UMKM lokal Makassar melalui pelatihan, permodalan, dan akses pasar. Kami membantu masyarakat mencapai kemandirian ekonomi.',
    reasons: [
      'Modal usaha untuk UMKM lokal Makassar',
      'Mentoring bisnis dari praktisi berpengalaman',
      'Pasar Islami untuk menjangkau lebih banyak pembeli',
      'Jaringan bisnis untuk perluasan usaha'
    ],
    campaigns: [
      { id: 'modal', title: 'Modal UMKM', image: 'https://images.unsplash.com/photo-1556742049-0c23a7e4ab7c?w=400&h=250&fit=crop', target: 50000000, raised: 38500000, donors: 78 },
      { id: 'mentoring', title: 'Mentoring Bisnis', image: 'https://images.unsplash.com/photo-1559136555-c9305db8a925?w=400&h=250&fit=crop', target: 20000000, raised: 14200000, donors: 45 },
      { id: 'pasar', title: 'Pasar Islami', image: 'https://images.unsplash.com/photo-1595246140625-573b715c11dc?w=400&h=250&fit=crop', target: 25000000, raised: 19800000, donors: 67 },
      { id: 'umkm', title: 'UMKM Makassar', image: 'https://images.unsplash.com/photo-1600880292203-47a7d3bf8bb1?w=400&h=250&fit=crop', target: 35000000, raised: 27100000, donors: 89 }
    ]
  }
]

function App() {
  const [activePillar, setActivePillar] = useState('pendidikan')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [donorData, setDonorData] = useState({ name: '', whatsapp: '', email: '' })
  const [donationAmount, setDonationAmount] = useState(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [transactionProof, setTransactionProof] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState({})
  const galleryRef = useRef(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

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
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Hero carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex(prev => (prev + 1) % pillars.length)
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
    setSelectedPaymentMethod(null)
    setTransactionProof(null)
    document.body.style.overflow = ''
  }

  const submitDonation = () => {
    if (!donorData.name || !donorData.whatsapp) {
      alert('Mohon lengkapi nama dan WhatsApp')
      return
    }
    const amount = donationAmount
    if (!amount || amount < 1000) {
      alert('Pilih nominal donasi')
      return
    }
    if (!selectedPaymentMethod) {
      alert('Pilih metode pembayaran')
      return
    }
    localStorage.setItem('jns_donor', JSON.stringify(donorData))
    const { pillar, campaign } = selectedCampaign
    const message = `Halo Admin JNS Social, saya ${donorData.name} ingin donasi ${campaign.title} (${pillar.title}) Rp${formatRupiah(amount)} via ${selectedPaymentMethod.name}. WA: ${donorData.whatsapp}${donorData.email ? `, Email: ${donorData.email}` : ''}`
    const waNumber = '628XXXXXXXXXX'
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank')
    closeModal()
  }

  return (
    <div className="min-h-screen bg-cream-soft">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-deep to-teal-light flex items-center justify-center shadow-lg shadow-teal-deep/30">
              <Heart className="w-5 h-5 text-white" fill="#38BDF8" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-teal-deep block tracking-tight">JNS</span>
              <span className="font-display text-xs text-emerald-bright font-medium tracking-widest uppercase">Social</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-teal-deep transition-colors">Tentang Kami</a>
            <a href="#programs" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-teal-deep transition-colors">Program</a>
            <a href="#contact" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-teal-deep transition-colors">Kontak</a>
            <button onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} className="bg-teal-deep hover:bg-teal-light text-white font-medium px-4 py-2 rounded-full transition-all text-sm">
              Donasi
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#3B82F6 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
        
        <div className={`max-w-7xl mx-auto px-4 py-16 lg:py-20 relative transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Carousel */}
            <div className="relative order-2 lg:order-1">
              <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {pillars.map((pillar, idx) => (
                  <div 
                    key={pillar.id}
                    className={`absolute inset-0 transition-all duration-700 ${idx === galleryIndex ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8'}`}
                  >
                    <img 
                      src={pillar.campaigns[0].image} 
                      alt={pillar.title}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${pillar.gradient} opacity-60`}></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block bg-white/90 text-teal-deep text-sm font-bold px-3 py-1 rounded-full mb-2">{pillar.title}</span>
                      <h3 className="text-white text-2xl font-bold mb-1">{pillar.campaigns[0].title}</h3>
                      <p className="text-white/80 text-sm">{pillar.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pillar Indicators */}
              <div className="flex justify-center gap-3 mt-6">
                {pillars.map((pillar, idx) => (
                  <button 
                    key={pillar.id}
                    onClick={() => setGalleryIndex(idx)}
                    className={`h-3 rounded-full transition-all ${idx === galleryIndex ? 'bg-emerald-bright w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-bright/20 to-teal-deep/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-teal-deep/10 to-emerald-bright/10 rounded-full blur-2xl"></div>
            </div>
            
            {/* Right: Text & CTA */}
            <div className="order-1 lg:order-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-teal-deep leading-[1.1] mb-6 tracking-tight">
                Bantuan Anda,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-bright to-teal-deep">Mengubah Hidup Mereka</span>
              </h1>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Di belakang kita, ada <span className="font-semibold text-teal-deep">ribuan anak</span> yang bermimpi punya masa depan cerah. Tapi keterbatasan ekonomi mengancam mimpi mereka. <span className="font-semibold">Bantu kami wujudkan harapan mereka</span> — karena kebaikan Anda hari ini, adalah investasi untuk generasi masa depan.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <button onClick={() => document.getElementById('programs').scrollIntoView({ behavior: 'smooth' })} 
                  className="group bg-gradient-to-r from-teal-deep to-teal-light hover:from-teal-light hover:to-teal-deep text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-teal-deep/30 hover:scale-105 active:scale-95 flex items-center gap-3">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Donasi Sekarang</span>
                </button>
                <a href="#transparency" 
                  className="border-2 border-teal-deep text-teal-deep font-semibold px-6 py-4 rounded-full transition-all duration-300 hover:bg-teal-deep hover:text-white hover:scale-105 active:scale-95">
                  Dampak Bantuan Anda
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 lg:py-28 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 transition-all duration-700 ${
          visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-teal-deep/10 text-teal-deep font-medium px-4 py-2 rounded-full text-sm mb-4">TENTANG KAMI</span>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-teal-deep mb-6">JNS Social</h2>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong className="text-teal-deep">JNS Social</strong> lahir dari keprihatinan melihat kondisi saudara-saudara kita di Makassar yang membutuhkan uluran tangan. Kami percaya bahwa satu rupiah dari Anda bisa mengubah hidup mereka.
                </p>
                <p>
                  Setiap donasi yang masuk <span className="font-semibold text-emerald-600">100% kami salurkan</span> ke penerima manfaat. Kami beroperasi dengan prinsip transparansi penuh — karena kepercayaan Anda adalah tanggung jawab kami.
                </p>
                <p>
                  Dari anak yatim yang bermimpi menjadi dokter, ibu-ibu yang ingin mandiri secara ekonomi, hingga masyarakat yang membutuhkan bantuan kesehatan — <span className="font-semibold text-teal-deep">mereka menunggu kebaikan hati Anda.</span>
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white border-2 border-amber-100 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-display text-lg font-bold text-teal-deep">Visi</span>
                  </div>
                  <p className="text-sm text-gray-600">Menjadi harapan bagi mereka yang membutuhkan di Sulawesi Selatan.</p>
                </div>
                <div className="bg-white border-2 border-amber-100 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-display text-lg font-bold text-teal-deep">Misi</span>
                  </div>
                  <p className="text-sm text-gray-600">Menyalurkan bantuan dengan amanah dan transparan.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-6 text-white shadow-xl">
                  <div className="font-display text-4xl font-bold mb-2 opacity-90">5</div>
                  <div className="text-white font-medium">Pilar Program</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-emerald-500" />
                    <span className="font-display text-lg font-bold text-teal-deep">Transparan</span>
                  </div>
                  <p className="text-sm text-gray-600">Laporan keuangan publik dan audit berkala.</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-purple-500" />
                    <span className="font-display text-lg font-bold text-teal-deep">Community</span>
                  </div>
                  <p className="text-sm text-gray-600">Ribuan donatur yang telah terpercaya.</p>
                </div>
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-6 text-white shadow-xl">
                  <div className="font-display text-4xl font-bold mb-2 opacity-90">100%</div>
                  <div className="text-orange-100 font-medium">Dana Tersalur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className={`py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 relative transition-all duration-700 ${
          visibleSections.programs ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-emerald-bright/10 text-emerald-bright font-medium px-4 py-2 rounded-full text-sm mb-4">PROGRAM KAMI</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-teal-deep mb-4">Pilar Program Kebaikan</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Pilih salah satu pilar untuk melihat campaign donasi yang tersedia.</p>
          </div>
          
          {/* Pillar Cards - Horizontal */}
          <div className="flex gap-4 justify-center flex-wrap mb-8">
            {pillars.map((p, idx) => (
              <button 
                key={p.id} 
                onClick={() => setActivePillar(p.id)}
                className={`group flex-shrink-0 w-36 sm:w-40 p-4 rounded-2xl transition-all duration-500 cursor-pointer ${
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
                <div className={`w-12 h-12 rounded-xl ${p.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-center text-sm">{p.title}</p>
              </button>
            ))}
          </div>

          {/* Pillar Description */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 max-w-4xl mx-auto border-t-4 border-emerald-bright">
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl ${currentPillar.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <currentPillar.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-display text-2xl font-bold text-teal-deep">{currentPillar.title}</h3>
                  <span className="bg-gradient-to-r from-emerald-bright to-teal-deep text-white text-sm font-medium px-3 py-1 rounded-full">{currentPillar.tagline}</span>
                </div>
                <p className="text-gray-600 mb-6">{currentPillar.description}</p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-bright/5 to-teal-deep/5 rounded-xl p-4 border border-emerald-bright/10">
                    <div className="flex items-center gap-2 mb-3">
                      <HeartHandshake className="w-5 h-5 text-emerald-bright" />
                      <span className="font-semibold text-teal-deep">Kenapa Berdonasi?</span>
                    </div>
                    <ul className="space-y-2">
                      {currentPillar.reasons.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-emerald-bright mt-0.5 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-teal-deep/5 to-emerald-bright/5 rounded-xl p-4 flex flex-col justify-center border border-emerald-bright/20">
                    <Quote className="w-8 h-8 text-emerald-bright mb-2" />
                    <p className="text-teal-deep/80 italic text-sm leading-relaxed">
                      "Setiap kebaikan yang kita lakukan untuk sesama adalah investasi untuk akhirat. Mari bersama menebar manfaat di Kota Daeng."
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                  <div className="relative h-40 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => e.target.style.display = 'none'} />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentPillar.gradient} opacity-60`}></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-white/90 text-xs font-medium">{currentPillar.title}</span>
                      <span className="bg-white/90 text-teal-deep text-xs font-bold px-2 py-1 rounded-full">{percent}%</span>
                    </div>
                    <div className="absolute inset-0 bg-teal-deep/0 group-hover:bg-teal-deep/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button className="bg-white text-teal-deep font-semibold px-4 py-2 rounded-full flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Heart className="w-4 h-4" /> Donasi
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-gray-800 mb-4">{c.title}</h3>
                    <div className="mb-4">
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-emerald-bright to-teal-deep rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-5 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Terkumpul</span><span className="font-semibold text-emerald-bright">Rp{formatRupiah(c.raised)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Target</span><span className="font-medium text-gray-600">Rp{formatRupiah(c.target)}</span></div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); openModal(currentPillar.id, c.id) }} className="w-full bg-teal-deep hover:bg-teal-light text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg">
                      <Heart className="w-4 h-4" /> Donasi Sekarang
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparency - Running Gallery */}
      <section id="transparency" className={`py-20 lg:py-28 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 transition-all duration-700 ${
          visibleSections.transparency ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-deep/10 text-teal-deep font-medium px-4 py-2 rounded-full text-sm mb-4">TRANSPARANSI</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-teal-deep mb-4">Bukti Penyaluran</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Dokumentasi kegiatan dan menyalurkan bantuan kami.</p>
          </div>

          {/* Running Gallery - Marquee Style */}
          <div className="relative overflow-hidden">
            <div className="flex gap-4 animate-marquee" ref={galleryRef}>
              {[...activities, ...activities].map((activity, idx) => (
                <div key={idx} className="flex-shrink-0 w-64 h-64 rounded-2xl overflow-hidden shadow-lg relative group cursor-pointer">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="%23f1f5f9"%3E%3Crect width="400" height="400" fill="%23f1f5f9"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14"%3EImage not available%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-emerald-bright text-teal-deep text-xs font-bold px-2 py-1 rounded-full mb-1">{activity.pillar}</span>
                    <h3 className="text-white font-semibold text-sm">{activity.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient fade edges */}
            <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 lg:py-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 transition-all duration-700 ${
          visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-4">Hubungi Kami</h2>
              <p className="text-teal-200 text-lg mb-10">Memiliki pertanyaan atau ingin berkolaborasi?</p>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-white p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Location className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">Kantor Makassar</div>
                    <div className="text-teal-200 text-sm">Jl. Perintis Kemerdekaan No.XX, Sulawesi Selatan</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-teal-200 text-sm">info@jnssocial.org</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-white p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <HandHeart className="w-5 h-5 text-emerald-bright" />
                  </div>
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-teal-200 text-sm">+62 XXX XXXX XXXX</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {modalOpen && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
          <div className="relative w-full max-w-lg max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-teal-deep to-teal-light px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-bright" fill="#38BDF8" />
                  </div>
                  <span className="font-semibold text-white text-lg">Donasi</span>
                </div>
                <button onClick={closeModal} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <p className="text-sm text-gray-400">Donasi untuk</p>
              <p className="font-display text-base font-bold text-teal-deep">{selectedCampaign.pillar.title} - {selectedCampaign.campaign.title}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Pilih nominal:</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[20000, 50000, 100000].map(amt => (
                  <button 
                    key={amt} 
                    onClick={() => setDonationAmount(amt)}
                    className={`py-2.5 border-2 rounded-lg text-center font-bold text-sm transition-all duration-200 ${
                      donationAmount === amt 
                        ? 'bg-teal-deep text-white border-teal-deep shadow-lg' 
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 mb-4 transition-all duration-200"
                onChange={e => setDonationAmount(parseInt(e.target.value) || 0)}
              />
              
              <p className="text-sm font-medium text-gray-700 mb-3">Metode Pembayaran:</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { id: 'bni', name: 'BNI', logo: 'BN', rekening: '1234567890', an: 'Yayasan JNS Social', color: 'bg-red-500' },
                  { id: 'mandiri', name: 'Bank Mandiri', logo: 'M', rekening: '9876543210', an: 'Yayasan JNS Social', color: 'bg-blue-700' },
                  { id: 'gopay', name: 'GoPay', logo: 'G', rekening: '081234567890', an: 'JNS Social', color: 'bg-green-500' },
                  { id: 'dana', name: 'DANA', logo: 'D', rekening: '081234567890', an: 'JNS Social', color: 'bg-blue-500' },
                ].map(method => (
                  <button 
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`p-3 border-2 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                      selectedPaymentMethod?.id === method.id
                        ? 'bg-teal-deep/10 border-teal-deep'
                        : 'border-gray-200 hover:border-teal-deep'
                    }`}
                  >
                    <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                      {method.logo}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 block">{method.name}</span>
                      {selectedPaymentMethod?.id === method.id && (
                        <span className="text-xs text-teal-deep mt-0.5 block">
                          {method.rekening}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <p className="text-sm font-medium text-gray-700 mb-3">Data diri:</p>
              <div className="space-y-3 mb-4">
                <input 
                  type="text" 
                  placeholder="Nama Lengkap *" 
                  required
                  value={donorData.name} 
                  onChange={e => setDonorData({ ...donorData, name: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 transition-all duration-200" 
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp *" 
                  required
                  value={donorData.whatsapp} 
                  onChange={e => setDonorData({ ...donorData, whatsapp: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 transition-all duration-200" 
                />
                <input 
                  type="email" 
                  placeholder="Email (opsional)" 
                  value={donorData.email} 
                  onChange={e => setDonorData({ ...donorData, email: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-deep focus:outline-none focus:ring-2 focus:ring-teal-deep/20 transition-all duration-200" 
                />
              </div>
              
              <p className="text-sm font-medium text-gray-700 mb-3">Bukti Transfer:</p>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center mb-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => setTransactionProof(e.target.files[0])}
                  className="hidden" 
                  id="bukti-transfer"
                />
                <label htmlFor="bukti-transfer" className="cursor-pointer">
                  {transactionProof ? (
                    <div className="flex items-center justify-center gap-2 text-teal-deep">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{transactionProof.name}</span>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <span className="text-sm">Klik untuk upload bukti</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <button 
                onClick={submitDonation} 
                disabled={!donorData.name || !donorData.whatsapp || !donationAmount || !selectedPaymentMethod}
                className="w-full bg-gradient-to-r from-teal-deep to-teal-light text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" /> Konfirmasi Donasi
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
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
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default App