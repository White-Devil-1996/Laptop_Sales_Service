import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type MenuChild = { title: string; link?: string; children?: MenuChild[] };
type Category = { icon: string; label: string; link?: string };
type CartItem = { title: string; qty: number; price: number; img: string; link?: string };

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [CommonModule,FormsModule],
  styleUrls: ['./header.css']
})
export class Header {
  // master data object that the template binds to
  headerData = {
  topPromo: {
    message: 'Grand opening – Laptop Sales & Service Centre,',
    discount: 15,
    daysLeft: 3
  },

  searchCategories: [
    'All Categories',
    'Laptops',
    'Laptop Accessories',
    'Laptop Service',
    'Gaming Laptops',
    'Desktop PCs',
    'Monitors',
    'Printers & Scanners',
    'Networking Devices',
    'Storage Devices',
    'Software & Antivirus'
  ],

  states: [
    'Your Location',
    'Tamil Nadu', 'Karnataka', 'Kerala', 'Telangana', 'Andhra Pradesh',
    'Maharashtra', 'Gujarat', 'Punjab', 'Delhi', 'Rajasthan',
    'Madhya Pradesh', 'Uttar Pradesh', 'West Bengal'
  ],

  categories: <Category[]>[
    { icon: 'category-laptop.svg', label: 'Laptops' },
    { icon: 'category-repair.svg', label: 'Laptop Repairs' },
    { icon: 'category-accessories.svg', label: 'Accessories' },
    { icon: 'category-upgrade.svg', label: 'Upgrades' },
    { icon: 'category-storage.svg', label: 'Storage Devices' },
    { icon: 'category-gaming.svg', label: 'Gaming Laptops' },
    { icon: 'category-desktop.svg', label: 'Desktops' },
    { icon: 'category-network.svg', label: 'Networking' },
    { icon: 'category-monitor.svg', label: 'Monitors' },
    { icon: 'category-software.svg', label: 'Software & Tools' }
  ],

  menu: <MenuChild[]>[
    {
      title: 'Home',
      link: 'index.html',
      children: [
        { title: 'Home – Main', link: 'index.html' },
        { title: 'Home – Services', link: 'index-2.html' },
        { title: 'Home – Storefront', link: 'index-3.html' },
        { title: 'Home – Gadgets', link: 'index-4.html' },
        { title: 'Home – Electronics', link: 'index-5.html' },
        { title: 'Home – Tech Shop', link: 'index-6.html' }
      ]
    },
    { title: 'About', link: 'page-about.html' },

    {
      title: 'Products',
      link: 'shop-grid-right.html',
      children: [
        { title: 'Laptops – Right Sidebar', link: 'shop-grid-right.html' },
        { title: 'Laptops – Left Sidebar', link: 'shop-grid-left.html' },
        { title: 'Laptop List – Right Sidebar', link: 'shop-list-right.html' },
        { title: 'Laptop List – Left Sidebar', link: 'shop-list-left.html' },
        { title: 'Shop – Wide', link: 'shop-fullwidth.html' }
      ]
    },

    {
      title: 'Services',
      children: [
        { title: 'Laptop Repair', link: 'service-repair.html' },
        { title: 'Chip Level Service', link: 'service-chip.html' },
        { title: 'Screen Replacement', link: 'service-screen.html' },
        { title: 'Battery Replacement', link: 'service-battery.html' },
        { title: 'SSD / RAM Upgrade', link: 'service-upgrade.html' },
        { title: 'Data Recovery', link: 'service-data.html' }
      ]
    },

    {
      title: 'Mega menu',
      children: [
        {
          title: 'Laptops',
          children: [
            { title: 'Gaming Laptops', link: 'shop-product-right.html' },
            { title: 'Business Laptops', link: 'shop-product-right.html' },
            { title: 'Student Laptops', link: 'shop-product-right.html' }
          ]
        },
        {
          title: 'Accessories',
          children: [
            { title: 'Chargers & Adapters', link: 'shop-product-right.html' },
            { title: 'Laptop Bags', link: 'shop-product-right.html' }
          ]
        },
        {
          title: 'Upgrades',
          children: [
            { title: 'SSD Upgrade', link: 'shop-product-right.html' },
            { title: 'RAM Upgrade', link: 'shop-product-right.html' }
          ]
        }
      ]
    },

    { title: 'Blog', link: 'blog-category-grid.html' },

    {
      title: 'Pages',
      children: [
        { title: 'About Us', link: 'page-about.html' },
        { title: 'Contact', link: 'page-contact.html' },
        { title: 'My Account', link: 'page-account.html' },
        { title: 'Login', link: 'page-login.html' },
        { title: 'Register', link: 'page-register.html' }
      ]
    },

    { title: 'Contact', link: 'page-contact.html' }
  ],

  cartItems: <CartItem[]>[
    { title: 'Dell Laptop Backpack', qty: 1, price: 1200, img: 'laptop-bag.jpg', link: 'shop-product-right.html' },
    { title: 'Wireless Mouse', qty: 1, price: 899, img: 'mouse.jpg', link: 'shop-product-right.html' }
  ],

  mobileMenu: [
    'Home', 'Products', 'Services', 'Mega menu', 'Blog', 'Pages', 'Language'
  ],

  social: [
    'icon-facebook-white.svg',
    'icon-twitter-white.svg',
    'icon-instagram-white.svg',
    'icon-pinterest-white.svg',
    'icon-youtube-white.svg'
  ],

  contactNumber: '(+91) - 93633 11614'
};


  // toggles the category dropdown for desktop
  toggleCategory(event: Event) {
    event.preventDefault();
    const element = event.currentTarget as HTMLElement;
    const sibling = element.nextElementSibling as HTMLElement | null;
    if (!sibling) return;
    element.classList.toggle('open');
    sibling.classList.toggle('open');
  }

  // mobile menu toggles
  openMobile = false;
  toggleMobileMenu() {
    this.openMobile = !this.openMobile;
    // you can expand this to add/remove classes on <body> if required
  }


 // helper: cart total
  get cartTotal() {
    return this.headerData.cartItems.reduce((s, it) => s + it.price * it.qty, 0);
  }

  
}

