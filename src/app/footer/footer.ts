import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Newsletter {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  image?: string;
}

interface FeaturedPrice {
  title?: string;
  amount?: number;
}

interface Banner {
  img?: string;
  headline?: string;
  link?: string;
  delay?: number;
}

interface CategoryBox {
  title?: string;
  links?: string[];
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  // top-level pieces
  newsletter: Newsletter | null = null;
  featuredPrices: FeaturedPrice[] = [];
  topBanners: Banner[] = [];
  categoryBoxes: CategoryBox[] = [];
  aboutText = '';
  socialIcons: { src?: string; alt?: string }[] = [];
  contactInfo: ContactInfo | null = null;
  registeredOffice: ContactInfo | null = null;
  appImages: { src?: string; alt?: string }[] = [];
  paymentImage?: string;
  copyrightText = '';

  // placeholder image path (add this asset or change)
  placeholder = 'assets/imgs/placeholder.png';

  ngOnInit(): void {
   this.newsletter = {
  title: `Stay home & get expert\nlaptop service & accessories`,
  subtitle: `Start Your Laptop Care Journey with I max system Solutions`,
  placeholder: 'Your email address',
  image: 'assets/imgs/banner/laptopservice1.jpeg',
};

this.featuredPrices = [
  { title: 'Laptops Under', amount: 19999 },
  { title: 'Laptops Under', amount: 29999 },
  { title: 'Laptops Under', amount: 39999 },
  { title: 'Laptops Under', amount: 49999 },
  { title: 'Laptops Under', amount: 59999 },
];

this.topBanners = [
  { img: 'assets/imgs/banner/banner-1.png', headline: 'Premium Laptops for Work & Gaming', link: 'shop-grid-right.html', delay: 0 },
  { img: 'assets/imgs/banner/banner-2.png', headline: 'Fast & Reliable Laptop Repair Services', link: 'shop-grid-right.html', delay: 0.2 },
  { img: 'assets/imgs/banner/banner-3.png', headline: 'Genuine Parts & Accessories Available', link: 'shop-grid-right.html', delay: 0.4 },
  { img: 'assets/imgs/banner/banner-4.png', headline: 'Upgrade Your Laptop for Better Performance', link: 'shop-grid-right.html', delay: 0.6 },
];

this.categoryBoxes = [
  {
    title: 'Popular Searches:',
    links: [
      'Laptop Repair','Laptop Screen Replacement','Motherboard Service','Gaming Laptops',
      'SSD Upgrade','RAM Upgrade','Laptop Accessories','Laptop Battery',
      'Keyboard Replacement','MacBook Repair','Software Installation','Data Recovery','Cooling Pads','Antivirus Solutions','View All'
    ],
  },
  {
    title: 'Laptop Brands:',
    links: ['Dell','HP','Lenovo','Acer','Asus','MSI','Apple MacBook','Samsung','Avita','View All'],
  },
  {
    title: 'Accessories & Peripherals:',
    links: ['Laptop Bags','Keyboards','Mouse','Cooling Pads','Headphones','Webcams','USB Hubs','External HDD/SSD','Laptop Stands','Cables & Chargers'],
  },
  {
    title: 'Services Offered:',
    links: ['General Service','Laptop Cleaning','OS Installation','Data Backup','Hardware Upgrade','Chip Level Service','Virus Removal','Software Troubleshooting','Wi-Fi Issues','Performance Optimization'],
  },
  {
    title: 'Parts & Spares:',
    links: ['Batteries','Adapters','Screens','Keyboards','RAM','SSD','HDD','Cooling Fans','Motherboards','Speakers'],
  },
  {
    title: 'Computer & Tech:',
    links: ['Desktops','Monitors','Printers','Network Devices','Routers','Projectors','Smart Devices','Office Setup','Gaming Accessories','View all'],
  },
];

this.aboutText = `I max system Solutions, delivers professional laptop repair, sales, and IT support services. We specialize in multi-brand laptops, upgrades, chip-level repairs, and genuine spare parts to ensure top-quality performance and long-lasting reliability.`;

this.socialIcons = [
  { src: 'assets/imgs/youtube.png', alt: 'youtube' },
  { src: 'assets/imgs/facebook.png', alt: 'facebook' },
  { src: 'assets/imgs/linkedin.png', alt: 'linkedin' },
  { src: 'assets/imgs/twitter.png', alt: 'twitter' },
  { src: 'assets/imgs/instagram.png', alt: 'instagram' },
  { src: 'assets/imgs/whatsapp.png', alt: 'whatsapp' },
];

this.contactInfo = {
  address: 'Poonga Street, No-4/111, East Coast Rd, Palavakkam, Chennai, Tamil Nadu 600041',
  phone: '093633 11614',
  email: 'navintv4@gmail.com',
};

this.registeredOffice = { ...this.contactInfo };

this.appImages = [
  { src: 'assets/imgs/theme/app-store.jpg', alt: 'app-store' },
  { src: 'assets/imgs/theme/google-play.jpg', alt: 'google-play' },
];

this.paymentImage = 'assets/imgs/theme/payment-method.png';

this.copyrightText = `© 2025, Navin — All rights reserved`;

  }

  // helper to safely return image path or placeholder
  getImg(path?: string | null): string {
    if (!path) {
      return this.placeholder;
    }
    return path;
  }

  // safe text
  safeText(t?: string | null, fallback = ''): string {
    return t ?? fallback;
  }
}
