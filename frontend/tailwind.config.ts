import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			typography: {
  				DEFAULT: {
  					css: {
  						maxWidth: 'none',
  						color: 'inherit',
  						a: {
  							color: 'inherit',
  							textDecoration: 'none',
  						},
  						'[class~="lead"]': {
  							color: 'inherit',
  						},
  						strong: {
  							color: 'inherit',
  						},
  						'ul > li::before': {
  							backgroundColor: 'currentColor',
  						},
  						hr: {
  							borderColor: 'currentColor',
  						},
  						blockquote: {
  							color: 'inherit',
  							borderLeftColor: 'currentColor',
  						},
  						h1: {
  							color: 'inherit',
  						},
  						h2: {
  							color: 'inherit',
  						},
  						h3: {
  							color: 'inherit',
  						},
  						h4: {
  							color: 'inherit',
  						},
  						'figure figcaption': {
  							color: 'inherit',
  						},
  						code: {
  							color: 'inherit',
  						},
  						'a code': {
  							color: 'inherit',
  						},
  						pre: {
  							color: 'inherit',
  							backgroundColor: 'transparent',
  						},
  						thead: {
  							color: 'inherit',
  							borderBottomColor: 'currentColor',
  						},
  						'tbody tr': {
  							borderBottomColor: 'currentColor',
  						},
  					},
  				},
  			}
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'),
      require("tailwindcss-animate")
],
};

export default config; 