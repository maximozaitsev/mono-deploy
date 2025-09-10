#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Performance Analysis Report');
console.log('==============================\n');

// Analyze bundle sizes
const analyzeBundleSizes = () => {
  console.log('📦 Bundle Analysis:');
  
  const buildDir = path.join(__dirname, '..', '.next');
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found. Run "npm run build" first.');
    return;
  }

  // Check for static chunks
  const staticDir = path.join(buildDir, 'static', 'chunks');
  if (fs.existsSync(staticDir)) {
    const chunks = fs.readdirSync(staticDir);
    let totalSize = 0;
    
    chunks.forEach(chunk => {
      const chunkPath = path.join(staticDir, chunk);
      const stats = fs.statSync(chunkPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      
      console.log(`  📄 ${chunk}: ${sizeKB} KB`);
    });
    
    console.log(`  📊 Total chunks size: ${(totalSize / 1024).toFixed(2)} KB\n`);
  }
};

// Analyze image sizes
const analyzeImageSizes = () => {
  console.log('🖼️  Image Analysis:');
  
  const publicDir = path.join(__dirname, '..', 'public');
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.svg'];
  let totalImageSize = 0;
  let imageCount = 0;
  
  const scanDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else {
        const ext = path.extname(item).toLowerCase();
        if (imageExtensions.includes(ext)) {
          const sizeKB = (stat.size / 1024).toFixed(2);
          totalImageSize += stat.size;
          imageCount++;
          
          if (stat.size > 50 * 1024) { // Highlight large images
            console.log(`  ⚠️  ${itemPath.replace(publicDir, '')}: ${sizeKB} KB (LARGE)`);
          } else {
            console.log(`  ✅ ${itemPath.replace(publicDir, '')}: ${sizeKB} KB`);
          }
        }
      }
    });
  };
  
  scanDirectory(publicDir);
  console.log(`  📊 Total images: ${imageCount}, Total size: ${(totalImageSize / 1024).toFixed(2)} KB\n`);
};

// Analyze font sizes
const analyzeFontSizes = () => {
  console.log('🔤 Font Analysis:');
  
  const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
  if (!fs.existsSync(fontsDir)) {
    console.log('  ❌ Fonts directory not found.');
    return;
  }
  
  const scanFontDirectory = (dir) => {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanFontDirectory(itemPath);
      } else if (item.endsWith('.ttf') || item.endsWith('.woff') || item.endsWith('.woff2')) {
        const sizeKB = (stat.size / 1024).toFixed(2);
        console.log(`  📄 ${itemPath.replace(fontsDir, '')}: ${sizeKB} KB`);
      }
    });
  };
  
  scanFontDirectory(fontsDir);
  console.log('');
};

// Check for performance optimizations
const checkOptimizations = () => {
  console.log('⚡ Optimization Checklist:');
  
  const checks = [
    {
      name: 'Sharp installed',
      check: () => {
        const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
        return packageJson.dependencies?.sharp || packageJson.devDependencies?.sharp;
      }
    },
    {
      name: 'Next.js Image optimization enabled',
      check: () => {
        const configPath = path.join(__dirname, '..', 'next.config.mjs');
        if (!fs.existsSync(configPath)) return false;
        const config = fs.readFileSync(configPath, 'utf8');
        return config.includes('unoptimized: false');
      }
    },
    {
      name: 'Service Worker configured',
      check: () => {
        const configPath = path.join(__dirname, '..', 'next.config.mjs');
        if (!fs.existsSync(configPath)) return false;
        const config = fs.readFileSync(configPath, 'utf8');
        return config.includes('nextPWA');
      }
    },
    {
      name: 'Critical CSS included',
      check: () => {
        const criticalPath = path.join(__dirname, '..', 'src', 'styles', 'critical.scss');
        return fs.existsSync(criticalPath);
      }
    },
    {
      name: 'Font preloading configured',
      check: () => {
        const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
        if (!fs.existsSync(layoutPath)) return false;
        const layout = fs.readFileSync(layoutPath, 'utf8');
        return layout.includes('preload') && layout.includes('font');
      }
    }
  ];
  
  checks.forEach(({ name, check }) => {
    const result = check();
    console.log(`  ${result ? '✅' : '❌'} ${name}`);
  });
  
  console.log('');
};

// Performance recommendations
const performanceRecommendations = () => {
  console.log('💡 Performance Recommendations:');
  console.log('  1. Run Lighthouse audit: npm run lighthouse');
  console.log('  2. Test on slow 3G connection');
  console.log('  3. Monitor Core Web Vitals in production');
  console.log('  4. Consider implementing a CDN');
  console.log('  5. Enable HTTP/2 and compression on server');
  console.log('  6. Set up performance monitoring');
  console.log('');
};

// Main execution
const main = () => {
  analyzeBundleSizes();
  analyzeImageSizes();
  analyzeFontSizes();
  checkOptimizations();
  performanceRecommendations();
  
  console.log('🎯 Next Steps:');
  console.log('  1. Run "npm run build" to create production build');
  console.log('  2. Run "npm start" to test production server');
  console.log('  3. Open Chrome DevTools and run Lighthouse audit');
  console.log('  4. Check Network tab for loading performance');
  console.log('  5. Verify Service Worker is working');
};

main();
