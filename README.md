# Undo Redo App

Dự án Next.js mô tả chức năng undo redo

## Cài Đặt

Clone repo

```bash
git clone https://github.com/dunghm98/undo-redo-app.git
cd undo-redo-app
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```


## Task Ideas
### Ý tưởng bài toán
Ý tưởng sẽ tạo 1 state để lưu trữ trạng thái hiển thị hiện tại của ứng dụng, 2 stack để lưu trữ các trạng thái hiển thị của ứng dụng gọi là undoStack và reddoStack, 2 stack này sẽ lưu dưới dạng ngăn xếp, mỗi node bên trong sẽ là các state đã sảy ra

Mỗi State sẽ biểu thị trạng thái hiện tại của ứng dụng: số lượng Input, value của mỗi input tại thời điểm đó
Khi sảy ra 1 thay đổi trên ứng dụng (thêm/xoá input, thay đổi value của input), sẽ đặt state hiện tại (khi chưa apply thay đổi) vào RedoStack, và thực hiện thay đổi lưu vào currentState và hiển thị lên UI. 
Khi click Undo, sẽ lấy state hiện tại đặt vào RedoStack, sau đó sẽ lấy ra state mới nhất trong UndoStack và set vào currentstate
Xử lý tương tự nhưng ngược lại sẽ là Redo action. 
Nếu trong quá trình undo (currentState đang là 1 state thực hiện trong quá khứ) nếu 1 thay đổi mới đc tạo ra, Redo sẽ bị clear.

## Issues


### Một số issue gặp phải khi bắt đầu làm task

1. Lựa chọn kiểu dữ liệu lưu trữ các state 

Ban đầu ý tưởng là sẽ cần lưu một số thông tin của 1 state tại 1 thời điểm như sau: 
- List input
- ID của mỗi input
- Value của chuỗi đc nhập trong input 

Ban đầu tính sẽ sử dụng Map Object để lưu, ưu điểm của Map Object là việc thao tác với các phần tử con dễ dàng để get hoặc set theo key của item. Map có thể lưu trữ data theo đúng thứ tự thêm vào ban đầu

Tuy nhiên việc sử dụng kiểu dữ liệu phức tạp như Map hiệu năng sẽ ko tốt bằng object và array. Và 1 điều nữa là Redux ko khuyến khích việc dùng kiểu dữ liệu map trong store: "Do Not Put Non-Serializable Values in State or Actions
Avoid putting non-serializable values such as Promises, Symbols, Maps/Sets, functions, or class instances into the Redux store state or dispatched actions. This ensures that capabilities such as debugging via the Redux DevTools will work as expected. It also ensures that the UI will update as expected."

- Với Object có thể dùng để lưu các state dưới dạng key-value thì sẽ tối ưu ở lúc lấy ra phần tử có id nhất định để update
tuy nhiên sd object sẽ ko đảm bảo đúng thứ tự hiển thị của các input do tính chất của object ko đảm bảo theo thứ tự chúng đc thêm vào


- Với việc dùng array để lưu trữ các state thì sẽ khá ổn định khi lưu trữ các input đc thêm vào đảm bảo hiển thị ra đúng thứ tự,
tuy nhiên khi muốn lấy ra đúng input item có id cụ thể để cập nhật value của input đang đc gõ vào sẽ cần phải duyệt qua cả mảng -> với mảng lớn sẽ ảnh hưởng performance

- Trường hợp dùng array key làm index của từng input, lúc này ta sẽ quản lý các input theo key chứ ko theo id thì có vẻ ok, tuy nhiên lúc này mỗi input lại ko được quản lý theo id riêng biệt, nếu như sử dụng index key làm id thì khi thao tác xoá bất kì 1 input trong list sẽ sảy ra trường hợp id ko còn đúng với id ban đầu.

Tuy nhiên xem xét lại với bài toán hiện tại chưa cần thao tác cụ thể với id của mỗi input nên có thể dùng array làm stack lưu trữ state

2. Undo on each character change

Sau khi triển khai tính năng undo-redo khi gõ tiếng việt có dấu sẽ bị lỗi ở 1 vài chỗ do kiểu gõ unicode như ơ ớ ô ..., khi redo sẽ gặp hiện tượng ko đúng với thứ tự 

Đồng thời nhận thấy việc lưu toàn bộ mỗi ký tự đc nhập vào cũng sẽ tốn bộ nhớ nên sẽ sử dụng phương pháp Throttling để chỉ lưu các kí tự nhất định khi người dùng nhập vào ô text sau 1 khoảng thời gian thay vì lưu toàn bộ từng thay đổi

Và để tránh việc lưu redo quá nhiều làm tràn bộ nhớ thì sẽ tạo 1 biến limit chỉ lưu tối đa n state, khi vượt quá ngưỡng này sẽ xoá bớt các state đầu
