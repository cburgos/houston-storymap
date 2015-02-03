$(document).ready(function () {
    $("#divDebt").hide();
    $("#btnWorst").prop("disabled", true);
    $("#btnWorst").click(function () {
        $("#divWorst").toggle();
        $("#divDebt").hide();
        $("#divWorst").show();
        $("#btnDebt").removeAttr('disabled');
        $("#btnWorst").prop("disabled", true);
    });
    $("#btnDebt").click(function () {
        $("#divDebt").toggle();
        $("#divWorst").hide();
        $("#divDebt").show();
        $("#btnWorst").removeAttr('disabled');
        $("#btnDebt").prop("disabled", true);
    });
});


