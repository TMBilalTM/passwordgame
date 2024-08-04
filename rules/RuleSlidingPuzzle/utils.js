const BLANK_CELL_NUM = 8;

function getRandomWord(){
    let arr = ['hareket', 'ekle', 'yaş', 'önce', 'yardım', 'amaç', 'hava', 'her şey', 've', 'herhangi', 'kol', 'sanat', 'sor', 'kötü', 'çanta', 'yasakla', 'bar', 'yatak', 'bahis', 'büyük', 'az', 'kutu', 'erkek çocuk', 'otobüs', 'ama', 'satın al', 'yapabilmek', 'şapka', 'araba', 'kedi', 'CEO', 'polis', 'inek', 'ağla', 'bardak', 'kes', 'baba', 'gün', 'öl', 'kaz', 'DNA', 'köpek', 'kuru', 'vadesi geldi', 'kulak', 'ye', 'yumurta', 'son', 'dönem', 'vs', 'göz', 'fan', 'uzak', 'şişman', 'ücret', 'az', 'uygun', 'düzelt', 'uçmak', 'için', 'eğlence', 'boşluk', 'gaz', 'eşcinsel', 'al', 'Tanrı', 'silah', 'adam', 'şapka', 'o', 'hey', 'onu', 'kalça', 'onun', 'vuruş', 'sıcak', 'nasıl', 'buz', 'hasta', 'onun', 'jet', 'Yahudi', 'iş', 'neşe', 'anahtar', 'çocuk', 'laboratuvar', 'kucak', 'yasa', 'yat', 'bacak', 'bırak', 'yat', 'dudak', 'çok', 'düşük', 'kötü', 'adam', 'harita', 'belki', 'karıştır', 'anne', 'Bayan', 'ağ', 'yeni', 'başla', 'ne', 'şimdi', 'değil', 'kuru yemiş', 'garip', 'kapalı', 'yağ', 'eski', 'bir', 'bizim', 'dışarı', 'borç', 'sahip', 'tencere', 'öde', 'say', 'evcil hayvan', 'turta', 'patlama', 'sıcak', 'kırmızı', 'kurtar', 'sıra', 'sil', 'koş', 'üzgün', 'söyle', 'deniz', 'gör', 'set', 'o', 'günah', 'efendi', 'otur', 'altı', 'kayak', 'gökyüzü', 'oğul', 'dava et', 'güneş', 'dokun', 'vergi', 'çay', 'on', 'şu', 'bağla', 'ipucu', 'ayak parmağı', 'çok', 'üst', 'oyuncak', 'dene', 'iki', 'kullan', 'aracılığıyla', 'savaş', 'yol', 'ıslak', 'kim', 'neden', 'kazan', 'evet', 'hala', 'sen']
    
    return arr[Math.floor(Math.random()*(arr.length+1))];
}

function getShuffledPuzzle() {
    const values = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  
    const rowOne = [],
        rowTwo = [],
        rowThree = [];
  
    while (values.length) {
        const random = Math.floor(Math.random() * values.length);
    
        if (rowOne.length < 3) {
            rowOne.push(values.splice(random, 1)[0]);
        } else if (rowTwo.length < 3) {
            rowTwo.push(values.splice(random, 1)[0]);
        } else {
            rowThree.push(values.splice(random, 1)[0]);
        }
    }
  
    return [rowOne, rowTwo, rowThree];
};

function flattenArray(arr){
    return arr.reduce((flatArr, subArr) => flatArr.concat(subArr), []);
};
  
function getInversionsCount(arr){
    arr = flattenArray(arr).filter(n => n !== BLANK_CELL_NUM);
  
    const inversions = [];
  
    for (let i = 0; i < arr.length - 1; i++) {
        const currentValue = arr[i];
        const currentInversions = arr.filter(
            (val, j) => i < j && val < currentValue
        );
        inversions.push(currentInversions.length);
    }
  
    const inversionsCount = inversions.reduce((total, val) => total + val, 0);
  
    return inversionsCount;
};
  
function isSolvable(puzzle){
    return getInversionsCount(puzzle) % 2 === 0;
};
  
function getPuzzle(){
    let puzzle = getShuffledPuzzle();
  
    while (!isSolvable(puzzle)) {
        puzzle = getShuffledPuzzle();
    }
  
    return puzzle;
};


export {getRandomWord, getPuzzle, BLANK_CELL_NUM}