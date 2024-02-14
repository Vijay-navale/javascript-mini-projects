const DomStrings = {
    selectElement: 'movie',
    container: '.container',
    seats: '.row .seat:not(.occupied)',
    selectedSeats: '.row .seat.selected',
    count: '#count',
    total: '#total',
};

const movieSelect = document.getElementById(DomStrings.selectElement);
const container = document.querySelector(DomStrings.container);
const seats = document.querySelectorAll(DomStrings.seats);
const count = document.querySelector(DomStrings.count);
const total = document.querySelector(DomStrings.total);

let ticketPrice = +movieSelect.value;

const setLS = (movieIndex, movieValue) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', movieValue);
};
const initialRender = () => {
    const selectedSeatsArrIndex = JSON.parse(
        localStorage.getItem('selectedSeatsArrIndex')
    );

    if (selectedSeatsArrIndex !== null && selectedSeatsArrIndex.length > 0) {
        [...seats].forEach((seat, index) => {
            if (selectedSeatsArrIndex.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
};
initialRender();

const updateData = () => {
    const selectedSeats = document.querySelectorAll(DomStrings.selectedSeats);

    const seatIndexArr = [...selectedSeats].map((selectedSeat) =>
        [...seats].indexOf(selectedSeat)
    );

    localStorage.setItem('selectedSeatsArrIndex', JSON.stringify(seatIndexArr));

    if (seatIndexArr.length > 0) {
        count.textContent = seatIndexArr.length;
        total.textContent = seatIndexArr.length * ticketPrice;
    }

    setLS(movieSelect.selectedIndex, movieSelect.value);
};

movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;

    setLS(e.target.selectedIndex, e.target.value);

    updateData();
});

container.addEventListener('click', (e) => {

    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateData();
    }
});

updateData();
