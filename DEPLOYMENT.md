# 🚀 Deployment Guide

## Option 1: Simple File Hosting (Recommended for Most)

### Step 1: Download Files
1. Download all files from this repository
2. Keep them in the same folder together

### Step 2: Open Locally
1. Double-click `index.html` 
2. The game opens in your default browser
3. **That's it!** Share your screen with students

### Step 3: For Multiple Devices
1. Put the folder on a shared network drive
2. Students navigate to the folder and open `index.html`
3. Or email the folder to families for home practice

---

## Option 2: GitHub Pages (Free Web Hosting)

### Quick Setup
1. Fork this repository on GitHub
2. Go to Settings → Pages
3. Select "Deploy from branch" → "main"
4. Your game is live at: `https://yourusername.github.io/decode-the-word`

### Benefits
- Students can access from any device with internet
- Automatic updates when you make changes
- Professional web address to share

---

## Option 3: School Network Deployment

### For IT Administrators
1. Copy files to school web server
2. No database or special requirements needed
3. Pure HTML/CSS/JS - works on any web server
4. Can be placed in any directory

### Security Notes
- No external data transmission
- All data stored locally in browser
- No user accounts or personal information collected
- COPPA/FERPA compliant

---

## Classroom Setup Tips

### Interactive Whiteboard
- Open in full-screen mode (F11)
- Use projector mode for whole-class activities
- Students can come up and type guesses

### Student Devices (1:1)
- Share the web address or file location
- Students work independently
- Teacher can set focus area for whole class

### Hybrid Setup
- Teacher controls focus area on main screen
- Students play individual games on their devices
- Use "Teacher Settings" to set specific words

---

## Troubleshooting

### Audio Not Working
1. Check browser permissions for audio
2. Try clicking once on page first (browser policy)
3. Use Chrome/Firefox for best compatibility

### Files Not Loading
1. Ensure all files are in same folder
2. Check that JavaScript is enabled
3. Try different browser if issues persist

### Recording Studio Issues
1. Allow microphone permissions when prompted
2. Use HTTPS (not HTTP) if hosting online
3. Chrome recommended for recording features

---

## Browser Compatibility

### ✅ Fully Supported
- **Chrome** (recommended)
- **Firefox** 
- **Safari** (iOS/macOS)
- **Edge**

### ⚠️ Limited Features
- **Internet Explorer** (game works, no recording studio)
- **Older browsers** (may need audio fallbacks)

---

## Performance Notes

### Device Requirements
- **Minimum**: Any device from last 5 years
- **RAM**: 1GB+ recommended for smooth performance
- **Storage**: 5MB for cached audio files
- **Internet**: Only needed for initial load

### Optimization for Older Devices
- Disable animations in browser settings if needed
- Close other tabs/applications
- Consider simplified CSS for very old devices

---

## Updates and Maintenance

### Getting Updates
1. **GitHub users**: Pull latest changes
2. **Local files**: Download new version and replace files
3. **No automatic updates** - keeps your classroom stable

### Custom Modifications
- Edit `words.js` to add your own vocabulary
- Modify `style.css` for school branding
- Customize `focus-info.js` for curriculum alignment

### Backup Your Customizations
- Keep copies of any files you modify
- Document changes in a simple text file
- Test thoroughly before classroom use

---

## Support Resources

- **Technical Issues**: Check browser console (F12) for error messages
- **Educational Questions**: Review Science of Reading documentation
- **Feature Requests**: Open GitHub issue with educational rationale

**Remember**: This tool is designed to be simple and reliable. When in doubt, the basic file hosting approach works everywhere!
