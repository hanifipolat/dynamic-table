<?php
include 'incheader.php';
include 'api.php';
?>
<div class="container row pl-5 pt-5">
  <form id="kayitEkle" action="javascript:void(0);">
    <div class="form-row">
      <div class="col-md-4 mb-3">
        <label for="validationDefault01">İsim</label>
        <input type="text" class="form-control" id="validationDefault01" name="name" value="" required>
      </div>
      <div class="col-md-4 mb-3">
        <label for="validationDefault02">Soyisim</label>
        <input type="text" class="form-control" id="validationDefault02" name="lastname" value="" required>
      </div>
      <div class="col-md-4 mb-3">
        <label for="validationDefaultUsername">Telefon Numarası</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend2">+90</span>
          </div>
          <input type="text" class="form-control" id="validationDefaultUsername" maxlength="10" placeholder="5XXXXXXXXX" name="number" aria-describedby="inputGroupPrepend2" required>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="col-md-6 mb-3">
        <label for="validationDefault03">Şehir</label>
        <input list="city" class="form-control" required name="city">
        <datalist id="city">
          <option value="Istanbul">
          <option value="Izmir">
          <option value="Ankara">
          <option value="Çanakkale">
          <option value="Eskişehir">
        </datalist>
      </div>
      <div class="col-md-3 mb-3">
        <label for="validationDefault04">Durum</label>
        <select class="custom-select" id="validationDefault04" name="state" required>
          <option selected disabled value="">Seçim...</option>
          <option name="active">Aktif</option>
          <option name="passive">Pasif</option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" onclick="delay()" id="save" type="submit">Gönder</button>
  </form>
</div>

<div class="spine fa-4x"><i class="fas fa-spinner fa-spin"></i></div>
<div class="row container pt-5 pl-5">
<input type="text" class="searchInput" id="myInput" onkeyup="search()" placeholder="Aranacak isim">
  <table id="myTable" class="table table-striped">
    <thead class="thead-dark">
      <tr class="">
        <th scope="col">#</th>
        <th scope="col">İsim</th>
        <th scope="col">Soyisim</th>
        <th scope="col">Telefon Numarası</th>
        <th scope="col">Şehir</th>
        <th scope="col">Durum</th>
        <th scope="col">Edit</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody class="veriler">
    </tbody>
  </table>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Güncelle</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Modal Body Start -->
        <form id="kayitDuzenle" action="javascript:void(0);">
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="validationDefault01">İsim</label>
              <input type="text" class="form-control" name="popupName" value="" required>
            </div>
            <div class="col-md-4 mb-3">
              <label for="validationDefault02">Soyisim</label>
              <input type="text" class="form-control" name="popupLastname" value="" required>
            </div>

          </div>
          <div class="form-row">

            <div class="col-md-6 mb-3">
              <label for="validationDefault03">Şehir</label>
              <input list="city" class="form-control" name="popupCity">
              <datalist id="city">
                <option value="Istanbul">
                <option value="Izmir">
                <option value="Ankara">
                <option value="Çanakkale">
                <option value="Eskişehir">
              </datalist>
            </div>
            <div class="col-md-4 mb-3">
              <label for="validationDefaultUsername">Telefon Numarası</label>
              <div class="input-group inputWidth">
                <div class="input-group-prepend">
                  <span class="input-group-text">+90</span>
                </div>
                <input class="form-control" style="width:555" name="popupNumber" maxlength="10" value="" type="text" required>
              </div>
            </div>
            <div class="hide"></div>
          </div>
        </form>
        <!-- Modal Body End-->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
        <button type="button" id="buttonChange" class="btn btn-primary" data-dismiss="modal">Değişikleri Kaydet</button>
      </div>
    </div>
  </div>
</div>

<?php
include 'incfooter.php';
?>