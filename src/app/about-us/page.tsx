import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden bg-ivory'>
      {/* Hero Section */}
      <div className='relative flex flex-col items-center justify-center p-4 py-10 md:px-40'>
        <div className='layout-content-container flex flex-col max-w-[960px] w-full'>
          <div className='@container'>
            <div className='@[480px]:p-4'>
              <div
                className='relative flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-8 overflow-hidden shadow-2xl'
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtOYCUeSrcFqMSckyo1M6XJM0zVIpeZ2IFijygyB8TyeLJnfll7bRA6b-xNF7HNnVymuMnVW-TG961lkr4AtzZxr-UKPNDIh8VM-ORKwvdsv8OamOvXs79BVXOJiuv4KxCV5ROETAsAv7trek0ZgDxQMz09h5kaANANyUJlCMB6zVWvNoDqyMGzAJQDFKbP3lAqXpRJd9ppQTVGsi34GG6cm7XacoGrvo5xHNBrBfjxg9YAarMtnTHXO4zKKGOme3JAIkCmhIBSQ")',
                }}>
                <div className='absolute inset-0 bg-black/20'></div>
                <div className='relative z-10 flex flex-col gap-4 text-center max-w-[700px]'>
                  <h1 className='text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl drop-shadow-lg'>
                    A Sanctuary of Peace
                  </h1>
                  <h2 className='text-gray-200 text-base font-normal leading-relaxed @[480px]:text-xl drop-shadow-md'>
                    Dedicated to Lord Vighneshwara, guiding devotees towards
                    spiritual enlightenment in the heart of Bangalore since
                    1985.
                  </h2>
                </div>
                <button className='relative z-10 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-orange-600 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-orange-700 hover:text-white transition-all duration-300 shadow-lg'>
                  <span className='truncate'>Explore Our History</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deity Spotlight Section */}
      <div className='flex justify-center px-4 py-10 md:px-40'>
        <div className='layout-content-container flex flex-col max-w-[960px] w-full'>
          <div className='flex flex-col gap-10 px-4 py-10 @container'>
            <div className='flex flex-col md:flex-row gap-10 items-center'>
              <div className='flex flex-col gap-6 flex-1'>
                <div className='flex flex-col gap-4'>
                  <h2 className='text-orange-600 text-sm font-bold uppercase tracking-widest'>
                    The Presiding Deity
                  </h2>
                  <h1 className='text-fg tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl max-w-[720px]'>
                    Remover of Obstacles
                  </h1>
                  <p className='text-muted text-lg font-normal leading-relaxed'>
                    Lord Ganesha, also known as Vighneshwara, is revered as the
                    patron of arts and sciences and the deva of intellect and
                    wisdom. As the god of beginnings, he is honoured at the
                    start of rituals and ceremonies. In our temple, the Moolavar
                    (main deity) is depicted in a seated posture, radiating
                    calmness and benevolence to all who seek his blessings.
                  </p>
                </div>
                <div className='flex gap-4 pt-2'>
                  <Link
                    href='/mythology'
                    className='flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors'>
                    <span className='material-symbols-outlined'>
                      auto_stories
                    </span>
                    <span>Read Mythology</span>
                  </Link>
                </div>
              </div>
              <div
                className='flex-1 w-full aspect-square md:aspect-[4/3] rounded-xl bg-cover bg-center border border-border'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCI6KrLItstHplBVCiiyM7tenNBcOjBYUPJO5daC__bUQRKgZQKsanT5l9792Hen_MSAB9Wj6BAk0eJgfmK7Fd1mqdVa7OpxEPXyEL1kXOaU4HASvJb-nSN3LQ60Mlg459Mfat7pMRrJE3z4mm9Mv3S9l6VeCrT-BvL-YSQMpdG9_gEOTGTz0XKZuSdw0njh5lqDLjItkhnDrXHUioA9zIIUwHR5rzDcp8QuhlN0-dV7W4X0GClPWVMbzgbh725ze19Px0zzjWf1w")',
                }}></div>
            </div>

            {/* Attributes Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8'>
              <div className='flex flex-1 gap-4 rounded-xl border border-border bg-white p-6 flex-col hover:border-orange-500/50 transition-colors group shadow-sm'>
                <div className='text-orange-600 group-hover:scale-110 transition-transform duration-300'>
                  <span className='material-symbols-outlined text-4xl'>
                    menu_book
                  </span>
                </div>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-fg text-lg font-bold leading-tight'>
                    Wisdom (Buddhi)
                  </h2>
                  <p className='text-muted text-sm font-normal leading-normal'>
                    Guiding devotees through life&apos;s challenges with divine
                    intellect and clarity of thought.
                  </p>
                </div>
              </div>
              <div className='flex flex-1 gap-4 rounded-xl border border-border bg-white p-6 flex-col hover:border-orange-500/50 transition-colors group shadow-sm'>
                <div className='text-orange-600 group-hover:scale-110 transition-transform duration-300'>
                  <span className='material-symbols-outlined text-4xl'>
                    currency_rupee
                  </span>
                </div>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-fg text-lg font-bold leading-tight'>
                    Prosperity (Riddhi)
                  </h2>
                  <p className='text-muted text-sm font-normal leading-normal'>
                    Bestowing material and spiritual abundance upon sincere
                    seekers and devotees.
                  </p>
                </div>
              </div>
              <div className='flex flex-1 gap-4 rounded-xl border border-border bg-white p-6 flex-col hover:border-orange-500/50 transition-colors group shadow-sm'>
                <div className='text-orange-600 group-hover:scale-110 transition-transform duration-300'>
                  <span className='material-symbols-outlined text-4xl'>
                    wb_twilight
                  </span>
                </div>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-fg text-lg font-bold leading-tight'>
                    New Beginnings
                  </h2>
                  <p className='text-muted text-sm font-normal leading-normal'>
                    Blessing every new venture, business, or life stage with
                    success and harmony.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className='w-full bg-orange-50 py-16 md:px-40 px-4 border-y border-border'>
        <div className='flex flex-col items-center justify-center max-w-[960px] mx-auto text-center gap-8'>
          <h2 className='text-fg text-3xl font-bold leading-tight'>
            Our Core Values
          </h2>
          <p className='text-muted max-w-2xl text-lg'>
            The temple operates not just as a place of worship, but as a center
            for cultural preservation and community service.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4'>
            <div className='flex flex-col items-center gap-3 p-4'>
              <div className='size-16 rounded-full bg-white border border-orange-500/30 flex items-center justify-center text-orange-600 shadow-sm'>
                <span className='material-symbols-outlined text-3xl'>
                  balance
                </span>
              </div>
              <h3 className='text-fg font-bold text-lg'>Dharma</h3>
              <p className='text-muted text-sm'>Upholding righteousness</p>
            </div>
            <div className='flex flex-col items-center gap-3 p-4'>
              <div className='size-16 rounded-full bg-white border border-orange-500/30 flex items-center justify-center text-orange-600 shadow-sm'>
                <span className='material-symbols-outlined text-3xl'>
                  volunteer_activism
                </span>
              </div>
              <h3 className='text-fg font-bold text-lg'>Seva</h3>
              <p className='text-muted text-sm'>Selfless service to all</p>
            </div>
            <div className='flex flex-col items-center gap-3 p-4'>
              <div className='size-16 rounded-full bg-white border border-orange-500/30 flex items-center justify-center text-orange-600 shadow-sm'>
                <span className='material-symbols-outlined text-3xl'>
                  self_improvement
                </span>
              </div>
              <h3 className='text-fg font-bold text-lg'>Bhakti</h3>
              <p className='text-muted text-sm'>Unwavering devotion</p>
            </div>
            <div className='flex flex-col items-center gap-3 p-4'>
              <div className='size-16 rounded-full bg-white border border-orange-500/30 flex items-center justify-center text-orange-600 shadow-sm'>
                <span className='material-symbols-outlined text-3xl'>
                  diversity_3
                </span>
              </div>
              <h3 className='text-fg font-bold text-lg'>Sanskriti</h3>
              <p className='text-muted text-sm'>Preserving culture</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className='flex justify-center px-4 py-10 md:px-40'>
        <div className='layout-content-container flex flex-col max-w-[960px] w-full'>
          <h2 className='text-fg text-[28px] font-bold leading-tight tracking-[-0.015em] px-4 pb-8 pt-5 text-center'>
            Our Journey Through Time
          </h2>
          <div className='grid grid-cols-[40px_1fr] gap-x-6 px-4'>
            {/* Item 1 */}
            <div className='flex flex-col items-center gap-1 pt-3'>
              <div
                className='bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-orange-500'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDT_QSCht3Q1guqeBhvcKmcs37D4gPrqV4LF3MNVr4LqLSXCTOxmAoGxELcskP7yDxK9LWXzzRTEbtjON7Waug1H1cN66mzhlkBRIG3r2ZktOT8-B6bduiGTSEk5ZZ5WEb5i3hGeonT8NcT80SIW-eHhaCZHamXSO89w0rRRjibzaw7VCtBu4Newmh883pMLfvHuK6CDafh_wFZWNofJh4pNnBnvY1b55xbbiphEex5mfwut1Y9KxA8FubPW4NfPYyGU7XNxqhgYA")',
                }}></div>
              <div className='w-[2px] bg-border h-full grow'></div>
            </div>
            <div className='flex flex-1 flex-col py-3 pb-10'>
              <p className='text-orange-600 text-lg font-bold leading-normal'>
                1985 - Foundation
              </p>
              <p className='text-muted text-base font-normal leading-relaxed mt-1'>
                Established by a group of devoted residents in a small temporary
                structure. The first idol was installed with simple rites,
                marking the beginning of a spiritual hub.
              </p>
            </div>

            {/* Item 2 */}
            <div className='flex flex-col items-center gap-1'>
              <div className='w-[2px] bg-border h-4'></div>
              <div
                className='bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-orange-500'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTH16wpRRVkHEV4kwbaNPIUISuS4_tNEwJhmDS7b55dbLVXh1_1cHo1EOM24pRyajAo3_L3ZS3M29_FTPNAgiU5LNVijNhPFCDnCsyVrLxkPcW0mIJwx328oZVHf8twGTLYdu9KRxjBaQIK6FAUYgpTlYeQu5YrO1nOLZ7bY1N_-WNzFcRZ7qQHN5RelRssDgFuuMBwsDWorGYP_-oYfDZTqWJxmN139yqGM6BlY21n5DCeUUvdL9nI1XMpbOYgOJdWsJnGjGEDQ")',
                }}></div>
              <div className='w-[2px] bg-border h-full grow'></div>
            </div>
            <div className='flex flex-1 flex-col py-3 pb-10'>
              <p className='text-orange-600 text-lg font-bold leading-normal'>
                1995 - Maha Kumbhabhishekam
              </p>
              <p className='text-muted text-base font-normal leading-relaxed mt-1'>
                First major consecration ceremony attended by thousands. The
                main Gopuram was constructed, and the sanctum sanctorum was
                formalized according to Agama Shastras.
              </p>
            </div>

            {/* Item 3 */}
            <div className='flex flex-col items-center gap-1'>
              <div className='w-[2px] bg-border h-4'></div>
              <div
                className='bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-orange-500'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1sVf2rvwfSxFnouYIzh7GqDPoEp36QTzIef9u34tJJCaosxYayFGDcniUnorCXzgeMLhBU6F1dMjJ9eV_7Ag349xJrud3D0EVAvHK_1zX6KYWE_O8g89Q33yVkrZ0D_-pfc6NyKWv4FLLW97G9ZDaDeOuWqHlZ2hXczy_rHzNCmpucg6HUuf0yTstdOilx12LKk9hpMPmQpKXO85cPXy7QsOdL_KLDXnQAGOy9T1UtAMke6MhqPyGUHiYrT7IRFy7HOSYkgXGmw")',
                }}></div>
              <div className='w-[2px] bg-border h-full grow'></div>
            </div>
            <div className='flex flex-1 flex-col py-3 pb-10'>
              <p className='text-orange-600 text-lg font-bold leading-normal'>
                2010 - Annadana Hall Expansion
              </p>
              <p className='text-muted text-base font-normal leading-relaxed mt-1'>
                New hall dedicated to daily food distribution service. This
                allowed the temple to serve over 500 devotees daily with
                wholesome prasadam.
              </p>
            </div>

            {/* Item 4 */}
            <div className='flex flex-col items-center gap-1 pb-3'>
              <div className='w-[2px] bg-border h-4'></div>
              <div
                className='bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-orange-500'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBqQhq-heyx_96W1OM8aaohsfj2ySzZrgvK4cAc4ZbrwmOc_VXM0jBeXLYc9B47Tx4QrU8dQQ74XaX9EvI9NB_9f1elbJ9Ae2PgIsd-Ut6d2uDd5qmv3vQEyKfTzo9hVUOw3Qsdu4DM9rF-V9Gqt7q3SHj1qDPI2onnG8WRbLqLbdsGT3cNJcfwn4YY6NxMwpNOL0_qXSxuIWhHv4N1t3YU_hZkubkOPLbPOrPukdlTopbHoEbVJKbQ6s5YQubkafl5ghun2q1hGg")',
                }}></div>
            </div>
            <div className='flex flex-1 flex-col py-3'>
              <p className='text-orange-600 text-lg font-bold leading-normal'>
                2023 - Renovation &amp; Gold Plating
              </p>
              <p className='text-muted text-base font-normal leading-relaxed mt-1'>
                Recent structural upgrades to the main sanctum, including the
                gold plating of the Vimana, enhancing the divine vibration of
                the temple premises.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Initiatives */}
      <div className='flex flex-col items-center w-full py-12 px-4 md:px-40 bg-white'>
        <div className='max-w-[960px] w-full'>
          <div className='flex flex-col gap-2 mb-8'>
            <h2 className='text-fg text-[28px] font-bold leading-tight'>
              Serving the Community
            </h2>
            <p className='text-muted'>
              Extending the grace of God through human hands.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='rounded-xl overflow-hidden bg-ivory border border-border flex flex-col md:flex-row shadow-sm'>
              <div
                className='w-full md:w-2/5 h-48 md:h-auto bg-cover bg-center'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAo5EuX7k6VG067x6RZC-pe9a2w0ZlQcuXCiAzOD0gTAKD61YG_vaT2Mt3gTo0cxQHd1rYwp2CT2kay6uCwbfpk6iZcVxD6-tSb9D-W8VJFQOZQvI8VmxykviuYpsq5fRBtOl03QXHWhP-7_rEaGsy7MWQHk8F2GtZTkoTUqD5ayB_2gVBBl45r4pRrncges8dLOGFbjqv2fewf_1SD2vayywtlysiN3GtWq8XN8oQsOyd7T08Ti6yVUA2D4NQ83-lGjhbHinznYg")',
                }}></div>
              <div className='p-6 flex flex-col justify-center flex-1'>
                <h3 className='text-fg font-bold text-lg mb-2'>
                  Veda Pathashala
                </h3>
                <p className='text-muted text-sm mb-4'>
                  Daily evening classes for children to learn Vedic chanting and
                  traditional slokas, preserving our ancient oral heritage.
                </p>
                <Link
                  className='text-orange-600 text-sm font-bold hover:underline'
                  href='/programs/veda-pathashala'>
                  View Schedule →
                </Link>
              </div>
            </div>
            <div className='rounded-xl overflow-hidden bg-ivory border border-border flex flex-col md:flex-row shadow-sm'>
              <div
                className='w-full md:w-2/5 h-48 md:h-auto bg-cover bg-center'
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBldmS9PdBYJpp1qAUTTRs8EjN0fxRBHv-9sILY5PWXuzr9I5x14jLWfV4r5T6wXoax239m3E_tbdHmhEk5FcNUlYQbcJNQtQip-8wzSGkwnIQj7bcUPmtrp85KGWomrahMM4jOtGPNBdSeh-YfLbiEj9apehwcLOVRfvnHwAb-lC_LVoXUQX09QvGM4FOniFUCvFD1gpg1MXy9zXlw4blOY7RM04Y2VtJ-NJcLLq6n_TAX4Z1umW6Gw4v3DihpQW7oOll7hK1qvg")',
                }}></div>
              <div className='p-6 flex flex-col justify-center flex-1'>
                <h3 className='text-fg font-bold text-lg mb-2'>
                  Nitya Annadanam
                </h3>
                <p className='text-muted text-sm mb-4'>
                  Providing free, nutritious meals to all visitors every
                  afternoon. No one leaves the temple hungry.
                </p>
                <Link
                  className='text-orange-600 text-sm font-bold hover:underline'
                  href='/donations'>
                  Donate Now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
