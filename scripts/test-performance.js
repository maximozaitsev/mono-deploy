#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const LIGHTHOUSE_CONFIG = {
  port: 3000,
  output: 'json',
  outputPath: './lighthouse-report.json',
  chromeFlags: '--headless --no-sandbox --disable-gpu',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
};

// Performance thresholds
const THRESHOLDS = {
  performance: 90,
  accessibility: 95,
  'best-practices': 95,
  seo: 95
};

function runLighthouse() {
  console.log('🚀 Starting Lighthouse performance test...');
  
  try {
    const command = `npx lighthouse http://localhost:${LIGHTHOUSE_CONFIG.port} \
      --output=${LIGHTHOUSE_CONFIG.output} \
      --output-path=${LIGHTHOUSE_CONFIG.outputPath} \
      --chrome-flags="${LIGHTHOUSE_CONFIG.chromeFlags}" \
      --only-categories=${LIGHTHOUSE_CONFIG.onlyCategories.join(',')}`;
    
    execSync(command, { stdio: 'inherit' });
    console.log('✅ Lighthouse test completed successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Lighthouse test failed:', error.message);
    return false;
  }
}

function analyzeResults() {
  console.log('\n📊 Analyzing Lighthouse results...');
  
  try {
    const reportPath = path.resolve(LIGHTHOUSE_CONFIG.outputPath);
    
    if (!fs.existsSync(reportPath)) {
      console.error('❌ Lighthouse report not found');
      return false;
    }
    
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const categories = report.categories;
    
    console.log('\n📈 Performance Scores:');
    console.log('=====================');
    
    let allPassed = true;
    
    Object.keys(categories).forEach(category => {
      const score = Math.round(categories[category].score * 100);
      const threshold = THRESHOLDS[category];
      const status = score >= threshold ? '✅' : '❌';
      
      console.log(`${status} ${category.toUpperCase()}: ${score}/100 (Target: ${threshold})`);
      
      if (score < threshold) {
        allPassed = false;
      }
    });
    
    // Core Web Vitals
    if (report.audits) {
      console.log('\n🎯 Core Web Vitals:');
      console.log('==================');
      
      const lcp = report.audits['largest-contentful-paint']?.numericValue;
      const fid = report.audits['max-potential-fid']?.numericValue;
      const cls = report.audits['cumulative-layout-shift']?.numericValue;
      
      if (lcp) console.log(`📱 LCP: ${(lcp / 1000).toFixed(2)}s (Target: <2.5s)`);
      if (fid) console.log(`⚡ FID: ${fid.toFixed(0)}ms (Target: <100ms)`);
      if (cls) console.log(`📐 CLS: ${cls.toFixed(3)} (Target: <0.1)`);
    }
    
    // Opportunities for improvement
    const opportunities = Object.values(report.audits || {})
      .filter(audit => audit.details?.type === 'opportunity' && audit.score < 1)
      .sort((a, b) => (b.numericValue || 0) - (a.numericValue || 0))
      .slice(0, 5);
    
    if (opportunities.length > 0) {
      console.log('\n🔧 Top Improvement Opportunities:');
      console.log('================================');
      
      opportunities.forEach(opportunity => {
        const savings = opportunity.numericValue ? 
          `${(opportunity.numericValue / 1000).toFixed(2)}s` : 
          'N/A';
        console.log(`• ${opportunity.title}: ${savings} potential savings`);
      });
    }
    
    return allPassed;
    
  } catch (error) {
    console.error('❌ Error analyzing results:', error.message);
    return false;
  }
}

function cleanup() {
  const reportPath = path.resolve(LIGHTHOUSE_CONFIG.outputPath);
  
  if (fs.existsSync(reportPath)) {
    fs.unlinkSync(reportPath);
    console.log('🧹 Cleaned up Lighthouse report');
  }
}

// Main execution
async function main() {
  console.log('🎯 Performance Testing Suite');
  console.log('============================\n');
  
  // Check if dev server is running
  try {
    execSync(`curl -s http://localhost:${LIGHTHOUSE_CONFIG.port} > /dev/null`, { stdio: 'ignore' });
  } catch (error) {
    console.error(`❌ Development server not running on port ${LIGHTHOUSE_CONFIG.port}`);
    console.log('💡 Please start the development server with: npm run dev');
    process.exit(1);
  }
  
  // Run Lighthouse
  const lighthouseSuccess = runLighthouse();
  
  if (!lighthouseSuccess) {
    console.error('❌ Performance test failed');
    process.exit(1);
  }
  
  // Analyze results
  const analysisSuccess = analyzeResults();
  
  // Cleanup
  cleanup();
  
  // Exit with appropriate code
  if (analysisSuccess) {
    console.log('\n🎉 All performance targets met!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some performance targets not met. Review the results above.');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Performance test suite failed:', error);
    process.exit(1);
  });
}

module.exports = { runLighthouse, analyzeResults, cleanup };
