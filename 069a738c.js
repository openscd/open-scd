import"https://openscd.github.io/open-scd-core/open-scd.js";fetch("./plugins.json").then((t=>t.text())).then((t=>{const e=document.querySelector("open-scd");e.setAttribute("plugins",t);const o=new URL(document.location).searchParams;for(const[t,n]of o)e.setAttribute(t,n)}));const t=document.querySelector("open-scd"),e=new URL(document.location).searchParams;for(const[o,n]of e)t.setAttribute(o,n);
