document.addEventListener('DOMContentLoaded', () => {
  // 添加平滑滚动
  document.querySelectorAll('.toc-content a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // 滚动到目标位置，添加偏移以避免被固定导航栏遮挡
        const offset = 80;
        const targetPosition = targetElement.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // 高亮当前目录项
        document.querySelectorAll('.toc-content a').forEach(a => a.classList.remove('active'));
        anchor.classList.add('active');
      }
    });
  });

  // 滚动时更新目录高亮
  window.addEventListener('scroll', () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const scrollPosition = window.scrollY;

    headings.forEach(heading => {
      if (heading.offsetTop <= scrollPosition + 100) {
        const id = heading.getAttribute('id');
        document.querySelectorAll('.toc-content a').forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  });
});
