AOS.init({
    once: true,
});
$('.button-wrap').on("click", function () {
    $(this).toggleClass('button-active');
    $(".toDate").toggleClass('input-active');
});
$(document).ready(function () {
    $('#twoways').on('change', function () {
        if (this.checked) {
            $('#waitingTime').prop('disabled', false).removeClass('is-disabled');
        } else {
            $('#waitingTime').prop('disabled', true).val('').addClass('is-disabled');
        }
    });
});


var $stopContainer = $('#stopPointsContainer');
var $stopCount = $('#stopCount');

$('#btnAddStop').on('click', function () {
    var count = $stopContainer.find('.stop-item').length + 1;

    var $wrapper = $('<div/>', { class: 'stop-item mb-2 d-flex align-items-start' });

    var $autoContainer = $('<div/>', { class: 'autocomplete-container', css: { position: 'relative', flex: '1' } });

    var $input = $('<input/>', {
        type: 'text',
        class: 'form-control me-2 autocomplete-input',
        placeholder: 'Điểm dừng ' + count
    });

    var $list = $('<div/>', { class: 'autocomplete-list', css: { display: 'none' } });

    $autoContainer.append($input).append($list);

    var $removeBtn = $('<button/>', {
        type: 'button',
        class: 'btn btn-danger btn-sm remove-stop',
        text: 'Xóa'
    });

    $wrapper.append($autoContainer).append($removeBtn);
    $stopContainer.append($wrapper);
});



$('#btnClearStops').on('click', function () {
    $stopContainer.empty();
    $stopCount.text('0');
    $('#HiddenStopPoints').val('');
});

$stopContainer.on('click', '.remove-stop', function () {
    $(this).closest('.stop-item').remove();
});

$('#btnConfirmStops').on('click', function () {
    var stops = [];
    $stopContainer.find('input').each(function () {
        var val = $(this).val().trim();
        if (val !== '') stops.push(val);
    });

    $stopCount.text(stops.length);
    $('#HiddenStopPoints').val(stops.join(', '));

    var modal = bootstrap.Modal.getInstance($('#stopModal')[0]);
    modal.hide();

    console.log('Danh sách điểm dừng:', stops);
});

$('.revert').on('click', function () {
    var diemDi = $('#diemDi').val();
    var diemDen = $('#diemDen').val();

    $('#diemDi').val(diemDen);
    $('#diemDen').val(diemDi);
});
$('#btnCheckPrice').on('click', function () {
    var from = $('#diemDi').val().trim();
    var to = $('#diemDen').val().trim();
    var pickUp = $('#datetimepicker').val().trim();

    if (from === '' || to === '' || pickUp === '') {
        alert('Vui lòng nhập đầy đủ Điểm đi, Điểm đến và Thời gian đón');
        return;
    }

    $('#confirmModal').modal('show');
});



$('#btnConfirmBooking').on('click', function (e) {
    e.preventDefault();
    var $form = $(this).closest('form');
    //var name = $('#nameInput').val().trim();
    var phone = $('#phoneInput').val().trim();

    //if (name === '' || phone === '') {
    //    alert('Vui lòng nhập Họ và tên và Số điện thoại');
    //    return;
    //}
    var stops = [];
    $('#stopPointsContainer').find('input').each(function () {
        var val = $(this).val().trim();
        if (val !== '') stops.push(val);
    });

    $('#HiddenStopPoints').val(stops.join(', '));

    console.log('StopPoints gửi lên:', $('#HiddenStopPoints').val());
    console.log('Data gửi lên:', $form.serialize());

    $.ajax({
        url: '/home/contactform',
        type: 'post',
        data: $form.serialize(),
        success: function (res) {
            if (res.status) {
                $.toast({
                    text: 'liên hệ thành công',
                    position: 'bottom-right',
                    icon: 'success',
                })
                $form[0].reset();
                $('#confirmmodal').modal('hide');
            } else {
                $.toast({
                    text: 'quá trình thực hiện không thành công. hãy thử lại',
                    icon: 'error',
                })
            }
        },
        error: function () {
            $.toast({
                text: 'có lỗi xảy ra khi gửi dữ liệu!',
                icon: 'error',
            })
        }
    });
});
function homeJs() {
    
    $('.slide-banner').slick({
        slidesToShow: 1,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    });
    $('.slide-fb').slick({
        slidesToShow: 1,
        infinite: true,
        dots: true,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
    });



    var rows = $("#myTable tbody tr");
    var showCount = 5;
    rows.slice(showCount).hide();
    $("#show-call-table").hide();
    $("#show-more-table").click(function () {
        rows.show();
        $(this).hide();
        $("#show-call-table").show();
    });

    const routes = [
        {
            "hanh_trinh": "Hà Nội - Sơn La",
            "gia": { "4_cho": "2.376.000 đ", "7_cho": "2.772.000 đ", "16_cho": "4.752.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Điện Biên",
            "gia": { "4_cho": "5.232.000 đ", "7_cho": "6.104.000 đ", "16_cho": "10.464.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Lai Châu",
            "gia": { "4_cho": "5.364.000 đ", "7_cho": "6.258.000 đ", "16_cho": "10.728.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Lào Cai",
            "gia": { "4_cho": "3.492.000 đ", "7_cho": "4.074.000 đ", "16_cho": "6.984.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Yên Bái",
            "gia": { "4_cho": "1.920.000 đ", "7_cho": "2.240.000 đ", "16_cho": "3.840.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Phú Thọ",
            "gia": { "4_cho": "1.224.000 đ", "7_cho": "1.428.000 đ", "16_cho": "2.448.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Hà Giang",
            "gia": { "4_cho": "3.564.000 đ", "7_cho": "4.158.000 đ", "16_cho": "7.128.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Tuyên Quang",
            "gia": { "4_cho": "1.752.000 đ", "7_cho": "2.044.000 đ", "16_cho": "3.504.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Cao Bằng",
            "gia": { "4_cho": "3.420.000 đ", "7_cho": "3.990.000 đ", "16_cho": "6.840.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Thái Nguyên",
            "gia": { "4_cho": "1.080.000 đ", "7_cho": "1.260.000 đ", "16_cho": "2.160.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Lạng Sơn",
            "gia": { "4_cho": "1.932.000 đ", "7_cho": "2.254.000 đ", "16_cho": "3.864.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Quảng Ninh",
            "gia": { "4_cho": "1.884.000 đ", "7_cho": "2.198.000 đ", "16_cho": "3.768.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Hải Phòng",
            "gia": { "4_cho": "1.500.000 đ", "7_cho": "1.750.000 đ", "16_cho": "3.000.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Nam Định",
            "gia": { "4_cho": "1.020.000 đ", "7_cho": "1.190.000 đ", "16_cho": "2.040.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Thái Bình",
            "gia": { "4_cho": "1.260.000 đ", "7_cho": "1.470.000 đ", "16_cho": "2.520.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Ninh Bình",
            "gia": { "4_cho": "1.140.000 đ", "7_cho": "1.330.000 đ", "16_cho": "2.280.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Thanh Hóa",
            "gia": { "4_cho": "2.016.000 đ", "7_cho": "2.352.000 đ", "16_cho": "4.032.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Nghệ An",
            "gia": { "4_cho": "4.140.000 đ", "7_cho": "4.830.000 đ", "16_cho": "8.280.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        },
        {
            "hanh_trinh": "Hà Nội - Hà Tĩnh",
            "gia": { "4_cho": "4.128.000 đ", "7_cho": "4.816.000 đ", "16_cho": "8.256.000 đ", "29_cho": "Liên hệ", "45_cho": "Liên hệ" }
        }
    ]
    function renderTable(type) {
        let rows = "";
        routes.forEach(r => {
            rows += `
          <tr>
            <td>${r.hanh_trinh}</td>
            <td><strong>${r.gia[type]}</strong></td>
          </tr>
        `;
        });
        $("#priceTable tbody").html(rows);
    }

    $(document).ready(function () {
        // Mặc định hiển thị 4 chỗ
        renderTable("4_cho");

        // Bắt sự kiện click
        $("#btn-4cho").click(function () {
            $("button").removeClass("active"); $(this).addClass("active");
            renderTable("4_cho");
        });
        $("#btn-7cho").click(function () {
            $("button").removeClass("active"); $(this).addClass("active");
            renderTable("7_cho");
        });
        $("#btn-16cho").click(function () {
            $("button").removeClass("active"); $(this).addClass("active");
            renderTable("16_cho");
        });
        $("#btn-29cho").click(function () {
            $("button").removeClass("active"); $(this).addClass("active");
            renderTable("29_cho");
        });
        $("#btn-45cho").click(function () {
            $("button").removeClass("active"); $(this).addClass("active");
            renderTable("45_cho");
        });
    });
}
function show() {
    $(".header-mobile").addClass('active')
    $(".overflow").addClass('active')
}
function Close() {
    $(".header-mobile").removeClass('active')
    $(".overflow").removeClass('active')
}
function productDetail() {
    $('.list-car').slick({
        slidesToShow: 3,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: "<button type='button' aria-label='bên trái' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button'aria-label='bên phải' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: false,
                    arrows: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    arrows: true,
                }
            }
        ]
    });
}
$(".view-all").click(function () {
    let $carBody = $(".car-body");
    let $btn = $(this);

    $carBody.toggleClass("active");

    if ($carBody.hasClass("active")) {
        $btn.text("Ẩn bớt");
    } else {
        $btn.text("Xem thêm");
    }
});




function autoComplate() {
    const API_KEY = "zxjFUlokomoYCcC9EzXHKSwXml4tYSafvdwJ6Qgn";
    const lat = 21.028511;
    const lng = 105.804817;
    const radius = 50000;

    $(document).on("input", ".autocomplete-input", function () {
        const $input = $(this);
        const keyword = $input.val().trim();
        const $container = $input.closest(".autocomplete-container");
        const $list = $container.find(".autocomplete-list");

        $list.empty().hide();

        if (keyword.length < 3) return;

        const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${API_KEY}&input=${encodeURIComponent(keyword)}&location=${lat},${lng}&radius=${radius}`;

        $.getJSON(url, function (data) {
            $.each(data.predictions, function (i, item) {
                const $div = $("<div>", { class: "autocomplete-item" });
                const $icon = $("<img>", {
                    class: "autocomplete-icon",
                    src: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png"
                });
                const $textWrap = $("<div>", { class: "autocomplete-text" });
                const $primary = $("<div>", { class: "primary" }).text(item.structured_formatting.main_text || item.description);
                const $secondary = $("<div>", { class: "secondary" }).text(item.structured_formatting.secondary_text || "");
                $textWrap.append($primary, $secondary);
                $div.append($icon, $textWrap);

                $div.on("click", function () {
                    selectPlace(item.place_id, item.description, $input, $list);
                });

                $list.append($div);
            });
            $list.show();
        });
    });

    function selectPlace(placeId, description, $input, $list) {
        $list.empty().hide();
        $input.val(description);

        $.getJSON(`https://rsapi.goong.io/Place/Detail?place_id=${placeId}&api_key=${API_KEY}`, function (data) {
            const loc = data.result.geometry.location;
            console.log("Đã chọn:", description, "Lat:", loc.lat, "Lng:", loc.lng);
        });
    }
}