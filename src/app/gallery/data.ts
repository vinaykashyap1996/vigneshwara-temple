import { GalleryItem, GalleryFilter } from './types';

export const galleryFilters: GalleryFilter[] = [
  { id: 'all', label: 'gallery.filters.all' },
  { id: 'festivals', label: 'gallery.filters.festivals' },
  { id: 'rituals', label: 'gallery.filters.daily' },
  { id: 'community', label: 'gallery.filters.events' },
  { id: 'alankaram', label: 'gallery.filters.architecture' },
];

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Ganesh Chaturthi',
    subtitle: 'Maha Mangala Aarti',
    description:
      'Experience the divine energy of the main festival procession. A gathering of devotion where thousands witness the sacred flame.',
    category: 'festivals',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcnUdGp6Nf4KGW1lS5yFZiIiwmfoStQUfpDFie3GJaFfpIH4yHj96y2wTSHfpHfokvshCeiwOSrQUyg8Nxo2QwT6pQSp2cxc4xx5u0QNiXV0HDGASXAjVipxBj7xhO5Z003sVL18FNXjUVINKY9V1nT8vg0jSrH3u5wwxei2askhDC6qOXuq7jI9mZytvna03vUVHtVkjTHoK_ixPtV658sPmnjbB7LM7K6Ddci5cXasxW9NaCjJVkgVMcGpVxvIXX78A1A0JmuQ',
    featured: true,
    size: 'large',
  },
  {
    id: '2',
    title: 'Temple Bells & Sacred Echoes',
    subtitle: '',
    description: '',
    category: 'architecture',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAEUfY0fdAJ7BWpyJClx__RYSm8Ow0gdZqMaVIUQesbeMb-D41tNMtaBm6LmbkhHCYSybLmGO3Vnm18gjob79AlgeU-JJLb6BFklzXzN0ZqLqnOVF9G6QNLDo3CK1MOeHhfOPyqLD6G8lZK63NpqIM63GDPFguwaYmZtPbp3b0Bukz2it7-LZihzoxBvK6tlTLPgdvmGlTCA8LrTa0CVPRkvhlowSqUartulGepCY7szAPnXuc40y2NbHneMQQ5XByV-hatDP3KA',
    date: 'Sep 12, 2023',
    size: 'medium',
  },
  {
    id: '3',
    title: 'Deepotsava',
    subtitle: 'Festival of Lights',
    description: '',
    category: 'festivals',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBo9FfNvtkbtiGZ1DKgBnY7G_UizUQ9JzZ8mD58BHhYXUhCaNjWW-1xXdU4VJvn2n2hl89wzm-G7U8eaHBgcsc_Py8aogQHFc9NrCzgYxEWEULohqlDWuYqlkcoE9Tj-3fOdpXi7UoCzZ0A8Je_AY3niiDZ9CDgYL3vMdMrMfLSLJRHlMU7Yfu11U2eoTqYyHnKw11gz79LdvQX4wRSkEsV926Hg7keNUDBWGk2PfI0cayDiiJrDqwQZNrOUBUe7LqkTGga9MfBKg',
    size: 'small',
  },
  {
    id: '4',
    title: 'Flower Rangoli',
    subtitle: 'Decorations',
    description: '',
    category: 'alankaram',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDecqu9XRssJXhmd_x_ZISpUxOBm2yfdlSroUFCBUyzXDf43vKPhcHAGYD1y2NTJNX4UnAXY9HRiQxrljLYMF8ycgmIjrDzkdWBXNoHnkiYxgR9uwYAlgvQe8a6NAWKu33hXoF4AZImdz5lQKkExI6B_XxwjBhadJK4Qr46K49jmdRDVy1SJmtjUq7nf4K4CGCyul4OAp3b2XO5m0_jOD5ZEuykGri99KL1P-HY-EtGFmeOAq6rczXK4cM8hprpTn8OPht4Q1F41g',
    size: 'small',
  },
  {
    id: '5',
    title: 'Maha Yagna - Fire Rituals',
    subtitle: 'Daily Rituals',
    description:
      'Witness the sacred agni rising from the havan kund, carrying our prayers to the divine. Performed daily at sunrise.',
    category: 'rituals',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLUF98Hda57rirvcIavZ1oxsza2RKxXY0uJemCqfXko56qZiCS24CLSsJgV-ZUmZ62hBb0XwMLW9oRABVnYvSOW2TKEU-E7kn4qMdCal-WHrPtZmi24aVDHZg6zynBwEZWOxQ6iZuC2VUPcrxNDAYBvLD_098dt_VEcoRBIajxkxlLrXIeeSrZc1sXtW3gMq_N1KSsbsyTuFtYPFvQleoZQngKGX1q9gUsQA3TnzVc-ciXrsy0SwUCqfH6B0sS20w-NWf46YztCw',
    size: 'wide',
  },
  {
    id: '6',
    title: 'Community Service',
    subtitle: 'Seva',
    description: '',
    category: 'community',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6LA6aYVa2Z9gC_jWsILnYGX1rAYxDETovTc7BvXLcAmqI5I2KdDYjbi0hlpVmiJnIX7jX7XVIxIGBX4LH24-HD9IWsLHRRhnn2CzM4NoxzDgUDfdMRCnWKYgk2WgOU8Si4gtbO0-PZ8QGAM4zfBIEJM3jLe0u_uK1xQdTAhGD4gd3Roc6B91ZBV6a9II743HubdeeJDhTKTdBr76dq_6FM1c86tML1i7aBxCTcOQms-FZzhADVY_KfPySMeLbdQVkppK1WRoO1A',
    size: 'small',
  },
  {
    id: '7',
    title: 'Gopuram Views',
    subtitle: 'Architecture',
    description: '',
    category: 'architecture',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCMJWYV8XsVuUauaeAd0YOJfE4w65ennHR3C9fUCCkEZGTM4LirUc7oPJiIgJ1rMh6gMyBm-jmGzXsb5Ls67s-xekX8SMrcc6ZZMCLp1BwDCTC-qDKCYFWRX-j6pK469wGHOrW1tOrsX6cgSaPM1lBVWNG5pAgi24-9EGOZkBH6whfQ8DD-_StA9tf8tblZofctcrhS4ehZGblYQeuDSJJbmr9VkOvIYFBspxS8idqTJ-q5w1syXd0kzwbXTrXCKzR0GtYVByXCcQ',
    size: 'small',
  },
  {
    id: '8',
    title: 'Prasadam Seva',
    subtitle: 'Daily Offering',
    description: '',
    category: 'community',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2uWwfhtpCW97YyP8TOs5aqx2c-xuHJH8eAZbPgoDC7o_BtQwg92TnH24m58NjZSSozeEK3hYSZ2NFT3zkbR-ElCI8W1-M7N9kRtORXiTbAe26OxnaCAWeR01oOxg0-BJP4jNVpp0OFa1DPVHh9K5ROZ5qwAx5WG-LVT8xZPx1Ks_xPUR59c_EDs4Aa5nP6df3VYfrv7X1TVW5-f33P7j0Qng-_XsMx17guMU6plaxtcNwsxCnV5L_S0qKFrfDp3JPg9B8GUtmoQ',
    size: 'small',
  },
];
