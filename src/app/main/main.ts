import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

interface Slider {
  title?: string;
  subtitle?: string;
  background?: string;
  ctaPlaceholder?: string;
}
interface Category {
  name?: string;
  items?: number;
  img?: string;
}
interface Product {
  id: number;
  category?: string;
  title?: string;
  defaultImg?: string;
  hoverImg?: string;
  price?: number;
  oldPrice?: number;
  badge?: string;
  sold?: { sold?: number; total?: number } | null;
  rating?: number;
}
interface Deal {
  title?: string;
  img?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  countdown?: string; // use as data-countdown attr if needed
}
interface Banner {
  img?: string;
  headline?: string;
  link?: string;
}
interface SmallListItem {
  title?: string;
  img?: string;
  rating?: number;
  price?: number;
  oldPrice?: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  imports: [CommonModule],
  styleUrls: ['./main.css']
})
export class Main implements OnInit {
  // single data object that contains everything
  sliders: Slider[] = [];
  categories: Category[] = [];
  productsByTab: { [tabId: string]: Product[] } = {};
  deals: Deal[] = [];
  banners: Banner[] = [];
  topSelling: SmallListItem[] = [];
  trending: SmallListItem[] = [];
  recentlyAdded: SmallListItem[] = [];
  topRated: SmallListItem[] = [];

  // placeholder for broken/missing images
  placeholder = 'assets/imgs/placeholder.png';

  ngOnInit(): void {
    // populate sliders
this.sliders = [
  {
    title: `Don't miss amazing\nLaptop deals`,
    subtitle: 'Sign up for service updates & offers',
    background: 'assets/imgs/slider/laptop-slider-one.webp',
    ctaPlaceholder: 'Your email address',
  },
  {
    title: `Premium Laptops\nBig Discounts`,
    subtitle: 'Save up to 40% on top brands',
    background: 'assets/imgs/slider/laptop-slider-two.webp',
    ctaPlaceholder: 'Your email address',
  },
  {
    title: `Latest Gaming Laptops\nPower Meets Performance`,
    subtitle: 'Experience next-gen speed & graphics',
    background: 'assets/imgs/slider/laptop-slider-three.webp',
    ctaPlaceholder: 'Your email address',
  },
  {
    title: `Upgrade Your Work Setup\nSmart & Fast Laptops`,
    subtitle: 'Perfect for professionals and creators',
    background: 'assets/imgs/slider/laptop-slider-four.webp',
    ctaPlaceholder: 'Your email address',
  },
  {
    title: `Student-Friendly Laptops\nAffordable & Reliable`,
    subtitle: 'Top deals for study and productivity',
    background: 'assets/imgs/slider/laptop-slider-five.webp',
    ctaPlaceholder: 'Your email address',
  },
];


// categories (Laptop-related)
this.categories = [
  { name: 'Laptops', items: 120, img: 'assets/imgs/shop/laptop-slider-zero.webp' },
  { name: 'Gaming Laptops', items: 45, img: 'assets/imgs/shop/gaming-laptop.jpeg' },
  { name: 'Laptop Chargers', items: 30, img: 'assets/imgs/shop/laptopcharger.jpg' },
  { name: 'SSD & Storage', items: 40, img: 'assets/imgs/shop/SSDStorage.jpeg' },
  { name: 'RAM Upgrades', items: 35, img: 'assets/imgs/shop/RAMUpgrades.jpg' },
  { name: 'Keyboards', items: 25, img: 'assets/imgs/shop/Keyboards.jpeg' },
  { name: 'Laptop Bags', items: 50, img: 'assets/imgs/shop/LaptopBags.avif' },
  { name: 'Cooling Pads', items: 22, img: 'assets/imgs/shop/CoolingPads.jpeg' },
  { name: 'Monitors', items: 18, img: 'assets/imgs/shop/Monitors.avif' },
];

// laptop products (sample data)
const sampleProducts: Product[] = [
  {
    id: 1,
    category: 'HP',
    title: 'HP Pavilion 14 i5 12th Gen Laptop',
    defaultImg: 'assets/imgs/shop/hp.jpg',
    hoverImg: 'assets/imgs/shop/hp1.jpg',
    price: 58999,
    oldPrice: 62999,
    badge: 'Save 10%',
    sold: { sold: 32, total: 50 },
    rating: 4,
  },
  {
    id: 2,
    category: 'Dell',
    title: 'Dell Inspiron 3511 i3 11th Gen',
    defaultImg: 'assets/imgs/shop/del.jpeg',
    hoverImg: 'assets/imgs/shop/dell1.jpg',
    price: 42999,
    oldPrice: 47999,
    badge: 'Save 15%',
    rating: 4,
  },
  {
    id: 3,
    category: 'Lenovo',
    title: 'Lenovo IdeaPad Slim 3 Ryzen 5',
    defaultImg: 'assets/imgs/shop/lenovo.jpeg',
    hoverImg: 'assets/imgs/shop/lenovo1.jpg',
    price: 49999,
    oldPrice: 54999,
    badge: 'Sale',
    rating: 5,
  },
  {
    id: 4,
    category: 'Asus',
    title: 'Asus TUF Gaming F15 i5 GTX 1650',
    defaultImg: 'assets/imgs/shop/asus.webp',
    hoverImg: 'assets/imgs/shop/asus1jpg',
    price: 66999,
    oldPrice: 72999,
    badge: 'Best Seller',
    rating: 4,
  },
  {
    id: 5,
    category: 'Apple',
    title: 'Apple MacBook Air M1 13-inch',
    defaultImg: 'assets/imgs/shop/mac.jpeg',
    hoverImg: 'assets/imgs/shop/mac1.webp',
    price: 89999,
    oldPrice: 99999,
    badge: 'Save 10%',
    rating: 5,
  },
];

// map to tabs
this.productsByTab = {
  'tab-one-1': sampleProducts,
  'tab-two-1': sampleProducts.map((p) => ({ ...p, id: p.id + 10 })), // duplicate demo
  'tab-three-1': sampleProducts.map((p) => ({ ...p, id: p.id + 20 })), // duplicate demo
};

// deals of the day
this.deals = [
  {
    title: 'HP Victus Gaming Laptop Ryzen 7',
    img: 'assets/imgs/banner/hp.jpg',
    price: 74999,
    oldPrice: 82999,
    rating: 4,
    countdown: '2026/04/25 00:00:00',
  },
  {
    title: 'Lenovo ThinkPad E14 Business Laptop',
    img: 'assets/imgs/banner/lenovo.jpg',
    price: 62999,
    oldPrice: 67999,
    rating: 5,
    countdown: '2026/04/25 00:00:00',
  },
  {
    title: 'Dell G15 Gaming RTX 3050',
    img: 'assets/imgs/banner/dell.jpg',
    price: 89999,
    oldPrice: 95999,
    rating: 4,
    countdown: '2027/03/25 00:00:00',
  },
  {
    title: 'Acer Aspire 5 i5 12th Gen Laptop',
    img: 'assets/imgs/banner/acer.jpg',
    price: 49999,
    oldPrice: 54999,
    rating: 4,
    countdown: '2025/02/25 00:00:00',
  },
];

// banners
this.banners = [
  {
    img: 'assets/imgs/banner/offer.jpg',
    headline: '',
    link: 'shop-grid-right.html',
  },
  {
    img: 'assets/imgs/banner/service.webp',
    headline: '',
    link: 'shop-grid-right.html',
  },
  {
    img: 'assets/imgs/banner/upgrade.jpg',
    headline: '',
    link: 'shop-grid-right.html',
  },
];

// small lists: top selling laptops
this.topSelling = [
  { title: 'Dell Wireless Mouse WM126', img: 'assets/imgs/shop/delmouse.png', rating: 4, price: 899, oldPrice: 999 },
  { title: 'HP 15.6-inch Laptop Bag', img: 'assets/imgs/shop/LaptopBags.avif', rating: 4, price: 1499, oldPrice: 1699 },
  { title: 'Logitech K480 Bluetooth Keyboard', img: 'assets/imgs/shop/logitec.webp', rating: 5, price: 2799, oldPrice: 2999 },
];

this.trending = [  
  { title: 'Samsung 24" LED Monitor', img: 'assets/imgs/shop/Keyboards.jpeg', rating: 4, price: 8499, oldPrice: 8999 },
  { title: 'WD Blue 1TB SSD (NVMe)', img: 'assets/imgs/shop/ssd.webp', rating: 5, price: 3999, oldPrice: 4299 },
  { title: 'Logitech H111 Wired Headset', img: 'assets/imgs/shop/logihed.jpg', rating: 4, price: 599, oldPrice: 699 },
];

this.recentlyAdded = [
  { title: 'Lenovo 15.6" Laptop Bag', img: 'assets/imgs/shop/lenovobag.jpg', rating: 4, price: 1299, oldPrice: 1499 },
  { title: 'Adata 8GB DDR4 Laptop RAM', img: 'assets/imgs/shop/ram.jpg', rating: 5, price: 1899, oldPrice: 2099 },
  { title: 'Dell Laptop Charger 65W', img: 'assets/imgs/shop/charger.webp', rating: 4, price: 1199, oldPrice: 1399 },
];

this.topRated = [
  { title: 'Apple MacBook Pro M2', img: 'assets/imgs/shop/apple.jpg', rating: 5, price: 129999, oldPrice: 139999 },
  { title: 'Asus ROG Strix G15 Gaming Laptop', img: 'assets/imgs/shop/rog.jpg', rating: 5, price: 109999, oldPrice: 119999 },
  { title: 'Dell XPS 13 OLED Edition', img: 'assets/imgs/shop/dell.jpg', rating: 5, price: 139999, oldPrice: 149999 },
];

  }

  // helper to safely return image path or placeholder
  getImg(path?: string | null): string {
    if (!path) {
      return this.placeholder;
    }
    return path;
  }

  // returns array for star display (filled stars count)
  filledStars(n?: number): number[] {
    const count = Math.max(0, Math.min(5, Math.round(n ?? 0)));
    return new Array(count).fill(0);
  }

  emptyStars(n?: number): number[] {
    const filled = Math.max(0, Math.min(5, Math.round(n ?? 0)));
    return new Array(5 - filled).fill(0);
  }

  // safe text return
  safeText(t?: string | null, fallback = ''): string {
    return t ?? fallback;
  }
}
