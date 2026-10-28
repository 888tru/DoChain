const zlib=require('zlib'),fs=require('fs');
const crcT=(()=>{const t=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
const crc=b=>{let c=~0;for(const x of b)c=crcT[(c^x)&255]^(c>>>8);return ~c>>>0};
const chunk=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
function png(w,px){const raw=Buffer.alloc((w*4+1)*w);for(let y=0;y<w;y++){raw[y*(w*4+1)]=0;px.copy(raw,y*(w*4+1)+1,y*w*4,(y+1)*w*4)}
 const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(w,4);ih[8]=8;ih[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))])}
const dseg=(px,py,ax,ay,bx,by)=>{const dx=bx-ax,dy=by-ay;let t=((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy);t=Math.max(0,Math.min(1,t));return Math.hypot(px-ax-t*dx,py-ay-t*dy)};
function icon(size){const SS=3,N=size*SS,buf=Buffer.alloc(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){let r=0,g=0,b=0,cov=0;
  for(let sy=0;sy<SS;sy++)for(let sx=0;sx<SS;sx++){const u=(x+(sx+.5)/SS)/size,v=(y+(sy+.5)/SS)/size;
   const k=(u+v)/2; // diagonal gradient
   let R=0,G=0,B=0;
   const d=Math.min(dseg(u,v,.29,.52,.44,.67),dseg(u,v,.44,.67,.72,.35));
   const a=d<.06?1:0; // white check
   r+=a?255:R;g+=a?255:G;b+=a?255:B}
  const n=SS*SS,o=(y*size+x)*4;buf[o]=r/n;buf[o+1]=g/n;buf[o+2]=b/n;buf[o+3]=255}
 return png(size,buf)}
for(const s of [180,192,512])fs.writeFileSync(`icons/icon-${s}.png`,icon(s));
console.log('icons ok');

