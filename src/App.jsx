import { useState, useRef, useEffect } from 'react'
import { 
  Heart, MapPin, Eye, GraduationCap, Users, Mic, Briefcase, Send, X, Mail, 
  MapPin as Location, CheckCircle, Sparkles, Star, ArrowRight, HandHeart, 
  ChevronLeft, ChevronRight, Clock, Quote, ArrowUpRight, HeartHandshake, Target, Shield, Upload, MessageCircle,
  BookOpen, Laptop, Package, Stethoscope, Home, Leaf, Video, Headphones, Globe, Wallet, Calendar, Banknote, ShoppingBag, Network
} from 'lucide-react'

const activities = [
  { id: 1, title: 'Beasiswa Anak Yatim', pillar: 'Pendidikan', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=60&fit=crop', date: '20 Apr 2026' },
  { id: 2, title: 'Distribusi Paket Sembako', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=60&fit=crop', date: '19 Apr 2026' },
  { id: 3, title: 'Bantuan Kesehatan', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=60&fit=crop', date: '18 Apr 2026' },
  { id: 4, title: 'Webinar Islami', pillar: 'Media & Dakwah', image: 'https://images.unsplash.com/photo-1591115765373-ed8b0e5a8a23?w=400&q=60&fit=crop', date: '17 Apr 2026' },
  { id: 5, title: 'Qurban 2026', pillar: 'Sedekah & Infaq', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7e99f?w=400&q=60&fit=crop', date: '16 Apr 2026' },
  { id: 6, title: 'Modal UMKM Makassar', pillar: 'Ekonomi Ummat', image: 'https://images.unsplash.com/photo-1556742049-0c23a7e4ab7c?w=400&q=60&fit=crop', date: '15 Apr 2026' },
  { id: 7, title: 'Les Privat Gratis', pillar: 'Pendidikan', image: 'https://images.unsplash.com/photo-1434030216411-0b793b9d9f1d?w=400&q=60&fit=crop', date: '14 Apr 2026' },
  { id: 8, title: 'Panti Asuhan', pillar: 'Sosial', image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&q=60&fit=crop', date: '13 Apr 2026' },
]

const pillars = [
  { 
    id: 'pendidikan', 
    title: 'Pendidikan', 
    icon: GraduationCap, 
    color: 'bg-primary-green', 
    gradient: 'bg-gradient-to-br from-primary-green to-dark-green', 
    tagline: 'Wujudkan Mimpi Mereka',
    description: 'Ribuan anak di Makassar terancam kehilangan kesempatan belajar karena keterbatasan ekonomi. Setiap donasi Anda bisa membantu mereka tetap sekolah dan bermimpi besar.',
    benefits: [
      { icon: GraduationCap, title: 'Pendidikan', desc: 'Bantuan biaya sekolah' },
      { icon: BookOpen, title: 'Beasiswa', desc: 'Support biaya kuliah' },
      { icon: Laptop, title: 'Digital', desc: 'Tablet & laptop untuk belajar' },
      { icon: Users, title: 'Mentoring', desc: 'Bimbingan dari mentor' }
    ],
    campaigns: [
      { id: 'beasiswa', title: 'Beasiswa Anak Yatim', image: 'https://images.unsplash.com/photo-1503676260728-1c00da1a492d?w=300&q=60&fit=crop', target: 50000000, raised: 32500000, donors: 145 },
      { id: 'sekolah', title: 'Sekolah Gratis', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&q=60&fit=crop', target: 25000000, raised: 18200000, donors: 89 },
      { id: 'les', title: 'Les Privat Gratis', image: 'https://images.unsplash.com/photo-1434030216411-0b793b9d9f1d?w=300&q=60&fit=crop', target: 15000000, raised: 9800000, donors: 67 },
      { id: 'digital', title: 'Digital Literacy', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e499b9?w=300&q=60&fit=crop', target: 20000000, raised: 14100000, donors: 112 }
    ]
  },
  { 
    id: 'sosial', 
    title: 'Sosial', 
    icon: Users, 
    color: 'bg-primary-green', 
    gradient: 'bg-gradient-to-br from-primary-green to-dark-green', 
    tagline: 'Uluran Tangan Kita',
    description: 'Bantuan sosial untuk saudara-saudara kita yang membutuhkan. Dari paket kebutuhan dasar hingga bantuan kesehatan, kami hadir untuk meringankan beban mereka.',
    benefits: [
      { icon: Package, title: 'Sembako', desc: 'Paket kebutuhan pokok' },
      { icon: Stethoscope, title: 'Kesehatan', desc: 'Bantuan biaya berobat' },
      { icon: Home, title: 'Panti', desc: 'Dukungan untuk panti asuhan' },
      { icon: Leaf, title: 'Lingkungan', desc: 'Program Clean Makassar' }
    ],
    campaigns: [
      { id: 'sembako', title: 'Paket Sembako', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&q=60&fit=crop', target: 30000000, raised: 24800000, donors: 234 },
      { id: 'kesehatan', title: 'Bantuan Kesehatan', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=60&fit=crop', target: 40000000, raised: 28500000, donors: 156 },
      { id: 'panti', title: 'Bantuan Panti', image: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=300&q=60&fit=crop', target: 25000000, raised: 19200000, donors: 98 },
      { id: 'lingkungan', title: 'Clean Makassar', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300&q=60&fit=crop', target: 15000000, raised: 11300000, donors: 87 }
    ]
  },
  { 
    id: 'media-dakwah', 
    title: 'Media & Dakwah', 
    icon: Mic, 
    color: 'bg-primary-green', 
    gradient: 'bg-gradient-to-br from-primary-green to-dark-green', 
    tagline: 'Menyebaran Kebenaran',
    description: 'Konten dakwah Islami yang edukatif dan relevan untuk ummat di era digital. Kami memproduksi berbagai konten untuk memudahkan spread ilmu agama.',
    benefits: [
      { icon: Video, title: 'Konten', desc: 'Video dakwah Islami' },
      { icon: Mic, title: 'Webinar', desc: 'Live dengan ustadz' },
      { icon: Headphones, title: 'Podcast', desc: 'Kajian audio islami' },
      { icon: Globe, title: 'Digital', desc: 'Jangkauan nationwide' }
    ],
    campaigns: [
      { id: 'konten', title: 'Konten Dakwah', image: 'https://images.unsplash.com/photo-1594736797935-d09bc5b33f1a?w=300&q=60&fit=crop', target: 10000000, raised: 7500000, donors: 56 },
      { id: 'webinar', title: 'Webinar Islami', image: 'https://images.unsplash.com/photo-1591115765373-ed8b0e5a8a23?w=300&q=60&fit=crop', target: 8000000, raised: 5200000, donors: 43 },
      { id: 'podcast', title: 'Podcast UIN', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&q=60&fit=crop', target: 12000000, raised: 9100000, donors: 78 },
      { id: 'campaign', title: 'Campaign Dakwah', image: 'https://images.unsplash.com/photo-1600038224101-5f1f40bc5d6a?w=300&q=60&fit=crop', target: 20000000, raised: 15800000, donors: 134 }
    ]
  },
  { 
    id: 'sedekah-infaq', 
    title: 'Sedekah & Infaq', 
    icon: Heart, 
    color: 'bg-gold', 
    gradient: 'bg-gradient-to-br from-amber-500 to-yellow-400', 
    tagline: 'Beramal dengan Hati',
    description: 'Menghimpun dan menyalurkan sedekah dan infaq untuk kepentingan ummat. Setiap rupiah yang masuk akan kami salurkan dengan penuh amanah.',
    benefits: [
      { icon: Heart, title: 'Sedekah', desc: 'Beramal dengan hati' },
      { icon: Wallet, title: 'Infaq', desc: 'Infaq harian & bulanan' },
      { icon: Package, title: 'Qurban', desc: 'Program qurban Berkah' },
      { icon: Calendar, title: 'Monthly', desc: 'Donasi rutin setiap bulan' }
    ],
    campaigns: [
      { id: 'infaq', title: 'Infaq Sekarang', image: 'https://images.unsplash.com/photo-1594708767771-a25160e4c8b4?w=300&q=60&fit=crop', target: 50000000, raised: 42300000, donors: 312 },
      { id: 'sedekah', title: 'Sedekah Harian', image: 'https://images.unsplash.com/photo-1559027615-cd4627622ead?w=300&q=60&fit=crop', target: 30000000, raised: 26800000, donors: 267 },
      { id: 'qurban', title: 'Qurban 2026', image: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7e99f?w=300&q=60&fit=crop', target: 40000000, raised: 31500000, donors: 189 },
      { id: 'monthly', title: 'Monthly Donor', image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=300&q=60&fit=crop', target: 25000000, raised: 18200000, donors: 445 }
    ]
  },
  { 
    id: 'ekonomi-ummat', 
    title: 'Ekonomi Ummat', 
    icon: Briefcase, 
    color: 'bg-primary-green', 
    gradient: 'bg-gradient-to-br from-primary-green to-dark-green', 
    tagline: 'Membangun Kemandirian',
    description: 'Memberdayakan pelaku UMKM lokal Makassar melalui pelatihan, permodalan, dan akses pasar. Kami membantu masyarakat mencapai kemandirian ekonomi.',
    benefits: [
      { icon: Banknote, title: 'Modal', desc: 'Bantuan modal usaha' },
      { icon: Users, title: 'Mentoring', desc: 'Bimbing bisnis expert' },
      { icon: ShoppingBag, title: 'Pasar', desc: 'Pasar islami online' },
      { icon: Network, title: 'Jaringan', desc: 'Connect dengan para pelaku' }
    ],
    campaigns: [
      { id: 'modal', title: 'Modal UMKM', image: 'https://images.unsplash.com/photo-1556742049-0c23a7e4ab7c?w=300&q=60&fit=crop', target: 50000000, raised: 38500000, donors: 78 },
      { id: 'mentoring', title: 'Mentoring Bisnis', image: 'https://images.unsplash.com/photo-1559136555-c9305db8a925?w=300&q=60&fit=crop', target: 20000000, raised: 14200000, donors: 45 },
      { id: 'pasar', title: 'Pasar Islami', image: 'https://images.unsplash.com/photo-1595246140625-573b715c11dc?w=300&q=60&fit=crop', target: 25000000, raised: 19800000, donors: 67 },
      { id: 'umkm', title: 'UMKM Makassar', image: 'https://images.unsplash.com/photo-1600880292203-47a7d3bf8bb1?w=300&q=60&fit=crop', target: 35000000, raised: 27100000, donors: 89 }
    ]
  }
]

function App() {
  const [activePillar, setActivePillar] = useState('pendidikan')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [donorData, setDonorData] = useState({ name: '', whatsapp: '', email: '', message: '', suggestion: '' })
  const [donationAmount, setDonationAmount] = useState(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [transactionProof, setTransactionProof] = useState(null)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const galleryRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const currentPillar = pillars.find(p => p.id === activePillar)
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID').format(num)

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
    let message = `Halo Admin JNS Social, saya ${donorData.name} ingin donasi ${campaign.title} (${pillar.title}) Rp${formatRupiah(amount)} via ${selectedPaymentMethod.name}. WA: ${donorData.whatsapp}`
    if (donorData.email) message += `, Email: ${donorData.email}`
    if (donorData.message) message += `%0A%0APesan & Doa: ${donorData.message}`
    if (donorData.suggestion) message += `%0A%0AUsulan Program: ${donorData.suggestion}`
    const waNumber = '628XXXXXXXXXX'
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank')
    closeModal()
  }

return (
    <div className="min-h-screen bg-light-bg overflow-x-hidden">
      <a 
        href="https://wa.me/628XXXXXXXXXX" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-primary-green hover:bg-dark-green text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
      
<div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
  <nav className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
    <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <img src="/jns-logo.png" alt="JNS Social" className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl object-contain" />
      <span className="font-display text-sm sm:text-lg font-bold text-primary-green block tracking-tight">JNS Social</span>
    </div>
    <div className="flex items-center gap-2 sm:gap-6">
      <a href="#about" className="hidden sm:block text-xs sm:text-sm font-medium text-gray-600 hover:text-primary-green transition-colors">Tentang</a>
      <a href="#programs" className="hidden sm:block text-xs sm:text-sm font-medium text-gray-600 hover:text-primary-green transition-colors">Program</a>
      <a href="#contact" className="hidden sm:block text-xs sm:text-sm font-medium text-gray-600 hover:text-primary-green transition-colors">Kontak</a>
      <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary-green text-white text-xs px-2 py-1 rounded">
        Donasi
      </button>
    </div>
</nav>
  <div className="ticker-box">
    <div className="ticker-content" suppressHydrationWarning={true}>
      {isClient && (
        <>
          <span>Jalankan program kebermanfaatan umat 2026: santunan fakir miskin, bantuan pendidikan, kesehatan, dan pembangunan musholla. Mari bersama berkontribusi untuk kebaikan umat.</span>
          <span className="mobile-hidden">Jalankan program kebermanfaatan umat 2026: santunan fakir miskin, bantuan pendidikan, kesehatan, dan pembangunan musholla. Mari bersama berkontribusi untuk kebaikan umat.</span>
        </>
      )}
    </div>
  </div>
</div>
<div className="h-24 sm:h-20"></div>

<section id="hero" className="relative">
  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#2F5D3A 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>
  <div className="absolute top-1/3 -left-16 sm:-left-24 w-40 sm:w-56 h-40 sm:h-56 bg-primary-green/10 rounded-full blur-2xl"></div>
  <div className="absolute bottom-1/3 -right-16 sm:-right-24 w-40 sm:w-56 h-40 sm:h-56 bg-gold/10 rounded-full blur-2xl"></div>
  <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
  
  <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12 lg:py-20">
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-center">
      <div className="relative order-2 lg:order-1">
        <div className="relative h-[200px] sm:h-[300px] lg:h-[450px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
          {pillars[galleryIndex] && (
            <div className="absolute inset-0">
              <img 
                src={pillars[galleryIndex].campaigns[0].image + '&w=600&q=70'} 
                alt={pillars[galleryIndex].title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${pillars[galleryIndex].gradient} opacity-60`}></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <span className="inline-block bg-white/90 text-primary-green text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-lg mb-2">{pillars[galleryIndex].title}</span>
                <h3 className="text-white text-lg sm:text-2xl font-bold mb-1">{pillars[galleryIndex].campaigns[0].title}</h3>
                <p className="text-white/80 text-xs sm:text-sm">{pillars[galleryIndex].tagline}</p>
              </div>
            </div>
          )}
        </div>
              
              <div className="flex justify-center gap-3 mt-6">
                {pillars.map((pillar, idx) => (
                  <button 
                    key={pillar.id}
                    onClick={() => setGalleryIndex(idx)}
                    className={`h-3 rounded-lg transition-all ${idx === galleryIndex ? 'bg-emerald-bright w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                  />
                ))}
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary-green to-soft-green rounded-lg blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-teal-deep/10 to-emerald-bright/10 rounded-lg blur-2xl"></div>
      </div>
      
      <div className="order-1 lg:order-2">
        <h1 className="font-display text-2xl sm:text-3xl lg:text-5xl font-bold text-primary-green leading-tight mb-3 sm:mb-6 tracking-tight">
          Bantuan Anda,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-bright to-teal-deep">Mengubah Hidup Mereka</span>
        </h1>
        
        <p className="text-sm sm:text-base text-neutral-dark mb-4 sm:mb-6 leading-relaxed">
          Di belakang kita, ada <span className="font-semibold text-primary-green">ribuan anak</span> yang bermimpi punya masa depan cerah. Tapi keterbatasan ekonomi mengancam mimpi mereka. <span className="font-semibold">Bantu kami wujudkan harapan mereka</span> — karena kebaikan Anda hari ini, adalah investasi untuk generasi masa depan.
        </p>
        
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-primary-green text-white text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg">
            Donasi Sekarang
          </button>
          <a href="#transparency" 
            className="border border-primary-green text-primary-green text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg">
            Dampak
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="about" className="py-8 sm:py-16 lg:py-28 bg-light-bg">
  <div className="max-w-7xl mx-auto px-3 sm:px-4">
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
      <div>
        <span className="inline-block bg-primary-green/10 text-primary-green font-medium px-3 py-1 rounded text-xs mb-3">TENTANG KAMI</span>
        <h2 className="font-display text-xl sm:text-2xl lg:text-4xl font-bold text-primary-green mb-4">JNS Social</h2>
        <div className="space-y-3 sm:space-y-4 text-gray-700 text-xs sm:text-base leading-relaxed">
          <p>
            <strong className="text-primary-green">JNS Social</strong> lahir dari keprihatinan melihat kondisi saudara-saudara kita di Makassar yang membutuhkan uluran tangan. Kami percaya bahwa satu rupiah dari Anda bisa mengubah hidup mereka.
          </p>
          <p>
            Setiap donasi yang masuk <span className="font-semibold text-emerald-600">100% kami salurkan</span> ke penerima manfaat. Kami beroperasi dengan prinsip transparansi penuh.
          </p>
          <p>
            Dari anak yatim yang bermimpi menjadi dokter, ibu-ibu yang ingin mandiri secara ekonomi, hingga masyarakat yang membutuhkan bantuan kesehatan — <span className="font-semibold text-primary-green">mereka menunggu kebaikan hati Anda.</span>
          </p>
        </div>
              
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-white border border-primary-green/20 p-3 sm:p-5 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary-green to-dark-green flex items-center justify-center">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-display text-sm sm:text-lg font-bold text-primary-green">Visi</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-gray">Menjadi harapan bagi mereka yang membutuhkan di Sulawesi Selatan.</p>
          </div>
          <div className="bg-white border border-primary-green/20 p-3 sm:p-5 rounded-xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary-green to-dark-green flex items-center justify-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-display text-sm sm:text-lg font-bold text-primary-green">Misi</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Menyalurkan bantuan dengan amanah dan transparan.</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-md">
            <div className="font-display text-2xl sm:text-3xl font-bold mb-1">5</div>
            <div className="text-xs sm:text-sm font-medium">Pilar Program</div>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
              <span className="font-display text-sm sm:text-lg font-bold text-primary-green">Transparan</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Laporan keuangan publik dan audit berkala.</p>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span className="font-display text-sm sm:text-lg font-bold text-primary-green">Community</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Ribuan donatur yang telah terpercaya.</p>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-md">
            <div className="font-display text-2xl sm:text-3xl font-bold mb-1">100%</div>
            <div className="text-xs sm:text-sm text-orange-100 font-medium">Dana Tersalur</div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="py-8 sm:py-16 lg:py-28 bg-light-bg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-10">
            <span className="inline-block bg-emerald-bright/10 text-emerald-bright font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm mb-3 sm:mb-4">PROGRAM KAMI</span>
            <h2 className="font-display text-xl sm:text-2xl lg:text-4xl font-bold text-primary-green mb-3 sm:mb-4">Pilar Program Kebaikan</h2>
            <p className="text-gray-500 text-xs sm:text-sm px-4">Pilih salah satu pilar untuk melihat campaign donasi.</p>
          </div>
          
          <div className="flex gap-2 sm:gap-4 justify-center flex-wrap mb-6 sm:mb-8">
            {pillars.map((p, idx) => (
              <button 
                key={p.id} 
                onClick={() => {
                  setActivePillar(p.id)
                  document.getElementById('campaigns')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`group flex-shrink-0 w-20 sm:w-28 p-2 sm:p-4 rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                  activePillar === p.id 
                    ? `bg-white shadow-xl ring-2 ring-primary-green` 
                    : 'bg-white/50 shadow-md'
                }`}
              >
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl ${p.color} flex items-center justify-center mx-auto mb-2`}>
                  <p.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="font-semibold text-gray-800 text-center text-xs">{p.title}</p>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 max-w-4xl mx-auto border-t-2 sm:border-t-4 border-emerald-bright">
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-6">
              <div className={`w-12 h-12 sm:w-14 lg:w-16 rounded-xl lg:rounded-2xl ${currentPillar.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <currentPillar.icon className="w-5 h-5 sm:w-6 lg:w-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-primary-green">{currentPillar.title}</h3>
                  <span className="bg-gradient-to-r from-emerald-bright to-teal-deep text-white text-xs px-2 py-0.5 rounded">{currentPillar.tagline}</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-4">{currentPillar.description}</p>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {currentPillar.benefits?.map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 sm:p-3 border border-primary-green/10 flex items-start gap-2">
                      <item.icon className="w-4 h-4 text-primary-green flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-primary-green text-xs block">{item.title}</span>
                        <span className="text-xs text-neutral-gray">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div id="campaigns" className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {currentPillar.campaigns.map((c, idx) => {
              const percent = Math.round((c.raised / c.target) * 100)
              return (
                <div 
                  key={c.id} 
                  className="group w-[45%] sm:w-72 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => openModal(currentPillar.id, c.id)}
                >
                  <div className="relative h-28 sm:h-40 overflow-hidden bg-gray-100">
                    <img 
                      src={c.image + '&w=300&q=60'} 
                      alt={c.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${currentPillar.gradient} opacity-50`}></div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-white/90 text-xs">{currentPillar.title}</span>
                      <span className="bg-white/90 text-primary-green text-xs font-bold px-1.5 py-0.5 rounded">{percent}%</span>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-5">
                    <h3 className="font-display text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4">{c.title}</h3>
                    <div className="mb-2 sm:mb-4">
                      <div className="h-1.5 sm:h-2 bg-gray-100 rounded-lg overflow-hidden">
                        <div className={`h-full bg-gradient-to-r from-emerald-bright to-teal-deep rounded-lg`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Terkumpul</span><span className="font-semibold text-emerald-bright">Rp{formatRupiah(c.raised)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Target</span><span className="font-medium text-gray-600">Rp{formatRupiah(c.target)}</span></div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); openModal(currentPillar.id, c.id) }} className="w-full bg-primary-green text-white text-xs py-2 rounded-lg">
                      Donasi
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="transparency" className="py-8 sm:py-16 lg:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-3 sm:px-4">
    <div className="text-center mb-6 sm:mb-10">
      <span className="inline-block bg-primary-green/10 text-primary-green font-medium px-3 py-1 rounded text-xs mb-3">TRANSPARANSI</span>
      <h2 className="font-display text-xl sm:text-2xl lg:text-4xl font-bold text-primary-green mb-3">Bukti Penyaluran</h2>
      <p className="text-gray-500 text-xs sm:text-sm px-4">Dokumentasi kegiatan dan diserahkan bantuan kami.</p>
    </div>

    <div className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {[...activities, ...activities].map((activity, idx) => (
        <div key={idx} className="flex-shrink-0 w-32 sm:w-44 snap-start">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={activity.image + '&w=200&q=60'} 
              alt={activity.title} 
              className="w-full h-24 sm:h-32 object-cover"
              loading="lazy"
            />
            <div className="p-2">
              <span className="text-gold text-xs font-bold">{activity.pillar}</span>
              <h3 className="text-gray-800 font-semibold text-xs truncate block">{activity.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section id="contact" className="py-8 sm:py-16 lg:py-28 bg-dark-green">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Hubungi Kami</h2>
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

                <div className="mt-8">
                  <p className="text-teal-200 text-sm mb-4">Ikuti kami di:</p>
                  <div className="flex gap-4">
                    <a href="https://instagram.com/jnssocial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/master/SVG/White/Instagram_white.svg" alt="Instagram" className="w-6 h-6" />
                    </a>
                    <a href="https://facebook.com/jnssocial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <img src="https://raw.githubusercontent.com/gauravghongde/social-icons/master/SVG/White/Facebook_white.svg" alt="Facebook" className="w-6 h-6" />
                    </a>
                    <a href="https://tiktok.com/@jnssocial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"><path d="M16.8217 5.1344C16.0886 4.29394 15.6479 3.19805 15.6479 2H14.7293M16.8217 5.1344C17.4898 5.90063 18.3944 6.45788 19.4245 6.67608C19.7446 6.74574 20.0786 6.78293 20.4266 6.78293V10.2191C18.645 10.2191 16.9932 9.64801 15.6477 8.68211V15.6707C15.6477 19.1627 12.8082 22 9.32386 22C7.50043 22 5.85334 21.2198 4.69806 19.98C3.64486 18.847 2.99994 17.3331 2.99994 15.6707C2.99994 12.2298 5.75592 9.42509 9.17073 9.35079M16.8217 5.1344C16.8039 5.12276 16.7861 5.11101 16.7684 5.09914M6.9855 17.3517C6.64217 16.8781 6.43802 16.2977 6.43802 15.6661C6.43802 14.0734 7.73249 12.7778 9.32394 12.7778C9.62087 12.7778 9.9085 12.8288 10.1776 12.9124V9.40192C9.89921 9.36473 9.61622 9.34149 9.32394 9.34149C9.27287 9.34149 8.86177 9.36884 8.81073 9.36884M14.7244 2H12.2097L12.2051 15.7775C12.1494 17.3192 10.8781 18.5591 9.32386 18.5591C8.35878 18.5591 7.50971 18.0808 6.98079 17.3564"/></svg>
                    </a>
                    <a href="https://youtube.com/@jnssocial" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="font-display text-2xl font-bold text-primary-green mb-6">Informasi Legal</h3>
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

      {modalOpen && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
          <div className="relative w-full max-w-sm sm:max-w-lg max-h-[90vh] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-primary-green to-dark-green px-6 py-5 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-bright" fill="#C8A24A" />
                  </div>
                  <span className="font-semibold text-white text-lg">Donasi</span>
                </div>
                <button onClick={closeModal} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <p className="text-sm text-gray-400">Donasi untuk</p>
              <p className="font-display text-base font-bold text-primary-green">{selectedCampaign.pillar.title} - {selectedCampaign.campaign.title}</p>
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
                        ? 'bg-primary-green text-white border-teal-deep shadow-lg' 
                        : 'border-gray-200 hover:border-teal-deep hover:bg-primary-green/5'
                    }`}
                  >
                    {amt / 1000}rb
                  </button>
                ))}
              </div>
              
              <input 
                type="number" 
                placeholder="Nominal custom (Rp)" 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/20 mb-4 transition-all duration-200"
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
                        ? 'bg-primary-green/10 border-teal-deep'
                        : 'border-gray-200 hover:border-teal-deep'
                    }`}
                  >
                    <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                      {method.logo}
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800 block">{method.name}</span>
                      {selectedPaymentMethod?.id === method.id && (
                        <span className="text-xs text-primary-green mt-0.5 block">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all duration-200" 
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp *" 
                  required
                  value={donorData.whatsapp} 
                  onChange={e => setDonorData({ ...donorData, whatsapp: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all duration-200" 
                />
                <input 
                  type="email" 
                  placeholder="Email (opsional)" 
                  value={donorData.email} 
                  onChange={e => setDonorData({ ...donorData, email: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all duration-200" 
                />
                <textarea 
                  placeholder="Pesan & Titipan Doa (opsional)" 
                  value={donorData.message || ''} 
                  onChange={e => setDonorData({ ...donorData, message: e.target.value })} 
                  rows={2}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all duration-200 resize-none" 
                />
                <input 
                  type="text" 
                  placeholder="Usulan Program (opsional)" 
                  value={donorData.suggestion || ''} 
                  onChange={e => setDonorData({ ...donorData, suggestion: e.target.value })} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none focus:ring-2 focus:ring-primary-green/20 transition-all duration-200" 
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
                    <div className="flex items-center justify-center gap-2 text-primary-green">
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
                className="w-full bg-gradient-to-r from-primary-green to-dark-green text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
          100% { transform: translateX(-100%); }
        }
        .marquee-track {
          width: 100%;
          overflow: hidden;
        }
        .marquee-text {
          animation: marquee 25s linear infinite;
          white-space: nowrap;
        }
        .marquee-text:hover {
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
          .marquee-text {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default App